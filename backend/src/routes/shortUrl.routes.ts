import { Router } from 'express';
import {
  createShortUrl,
  redirectToOriginalUrl,
  getUrlInfo,
  deleteShortUrl,
  getAnalytics,
} from '../controllers/shortUrl.controller';

const router = Router();


/**
 * @swagger
 * /api/shorten:
 *   post:
 *     summary: Создать короткую ссылку
 *     tags: [ShortUrl]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - originalUrl
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 example: https://example.com
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *               alias:
 *                 type: string
 *                 maxLength: 20
 *     responses:
 *       200:
 *         description: Короткая ссылка создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortUrl:
 *                   type: string
 */
router.post('/api/shorten', createShortUrl);

/**
 * @swagger
 * /api/info/{shortUrl}:
 *   get:
 *     summary: Получить информацию о короткой ссылке
 *     tags: [ShortUrl]
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         required: true
 *         schema:
 *           type: string
 *         description: Укороченный идентификатор ссылки
 *     responses:
 *       200:
 *         description: Информация о ссылке
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 originalUrl:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 clickCount:
 *                   type: integer
 *       404:
 *         description: Ссылка не найдена
 */
router.get('/api/info/:alias', getUrlInfo);

/**
 * @swagger
 * /delete/{shortUrl}:
 *   delete:
 *     summary: Удалить короткую ссылку
 *     tags: [ShortUrl]
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         required: true
 *         schema:
 *           type: string
 *         description: Укороченный идентификатор ссылки
 *     responses:
 *       200:
 *         description: Ссылка успешно удалена
 *       404:
 *         description: Ссылка не найдена
 */
router.delete('/api/delete/:alias', deleteShortUrl);

/**
 * @swagger
 * /analytics/{shortUrl}:
 *   get:
 *     summary: Получить аналитику переходов по ссылке
 *     tags: [ShortUrl]
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         required: true
 *         schema:
 *           type: string
 *         description: Укороченный идентификатор ссылки
 *     responses:
 *       200:
 *         description: Статистика переходов
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clickCount:
 *                   type: integer
 *                 lastIps:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Ссылка не найдена
 */
router.get('/api/analytics/:alias', getAnalytics);

/**
 * @swagger
 * /{shortUrl}:
 *   get:
 *     summary: Переадресация по короткой ссылке
 *     tags: [ShortUrl]
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         required: true
 *         schema:
 *           type: string
 *         description: Укороченный идентификатор ссылки
 *     responses:
 *       302:
 *         description: Редирект на оригинальный URL
 *       404:
 *         description: Ссылка не найдена
 */
router.get('/:alias', redirectToOriginalUrl);

export default router;
