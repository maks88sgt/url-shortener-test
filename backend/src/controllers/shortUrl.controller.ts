import { Request, Response } from 'express';
import { AppDataSource } from '../ormconfig';
import { ShortUrl } from '../entities/ShortUrl';
import { Click } from '../entities/Click';
import { nanoid } from 'nanoid';

const shortUrlRepo = AppDataSource.getRepository(ShortUrl);
const clickRepo = AppDataSource.getRepository(Click);

// POST /shorten
export const createShortUrl = async (
  req: Request,
  res: Response,
) => {
  try {
    const { originalUrl, expiresAt, alias } = req.body;

    if (!originalUrl) {
      res
        .status(400)
        .json({ message: 'originalUrl is required' });
      return;
    }

    const existing = alias
      ? await shortUrlRepo.findOneBy({ alias })
      : null;

    if (existing) {
      res
        .status(409)
        .json({ message: 'Alias already in use' });
      return;
    }

    const finalAlias = alias || nanoid(8);

    const shortUrl = shortUrlRepo.create({
      originalUrl,
      expiresAt,
      alias: finalAlias,
    });

    await shortUrlRepo.save(shortUrl);

    res.status(201).json({
      shortUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/${finalAlias}`,
    });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

// GET /:alias
export const redirectToOriginalUrl = async (
  req: Request,
  res: Response,
) => {
  const { alias } = req.params;

  const url = await shortUrlRepo.findOneBy({ alias });

  if (!url) {
    res
      .status(404)
      .json({ message: 'Short URL not found' });
    return;
  }

  if (url.expiresAt && new Date() > url.expiresAt) {
    res.status(410).json({ message: 'Link expired' });
    return;
  }

  // Лог клика
  const ip =
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress;
  const click = clickRepo.create({
    ipAddress: typeof ip === 'string' ? ip : ip?.[0] || '',
    shortUrl: url,
  });

  url.clickCount += 1;
  await Promise.all([
    clickRepo.save(click),
    shortUrlRepo.save(url),
  ]);

  res.redirect(url.originalUrl);
  return;
};

// GET /info/:alias
export const getUrlInfo = async (
  req: Request,
  res: Response,
) => {
  const { alias } = req.params;

  const url = await shortUrlRepo.findOneBy({ alias });

  if (!url) {
    res
      .status(404)
      .json({ message: 'Short URL not found' });
    return;
  }

  res.json({
    originalUrl: url.originalUrl,
    createdAt: url.createdAt,
    clickCount: url.clickCount,
    expiresAt: url.expiresAt,
  });
  return;
};

// DELETE /delete/:alias
export const deleteShortUrl = async (
  req: Request,
  res: Response,
) => {
  const { alias } = req.params;

  const url = await shortUrlRepo.findOneBy({ alias });

  if (!url) {
    res
      .status(404)
      .json({ message: 'Short URL not found' });
    return;
  }

  await shortUrlRepo.remove(url);

  res.json({ message: 'Short URL deleted' });
  return;
};

// GET /analytics/:alias
export const getAnalytics = async (
  req: Request,
  res: Response,
) => {
  const { alias } = req.params;

  const url = await shortUrlRepo.findOne({
    where: { alias },
    relations: ['clicks'],
    order: { clicks: { clickedAt: 'DESC' } },
  });

  if (!url) {
    res
      .status(404)
      .json({ message: 'Short URL not found' });
    return;
  }

  const last5Clicks = url.clicks
    .sort(
      (a, b) =>
        b.clickedAt.getTime() - a.clickedAt.getTime(),
    )
    .slice(0, 5)
    .map((click) => ({
      ipAddress: click.ipAddress,
      clickedAt: click.clickedAt,
    }));

  const dailyClicksMap: Record<string, number> = {};
  url.clicks.forEach((click) => {
    const date = click.clickedAt.toISOString().split('T')[0]; // формат: YYYY-MM-DD
    dailyClicksMap[date] = (dailyClicksMap[date] || 0) + 1;
  });

  const dailyClicks = Object.entries(dailyClicksMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({
      date,
      count,
    }));

  res.json({
    totalClicks: url.clickCount,
    last5Clicks,
    dailyClicks,
  });
  return;
};
