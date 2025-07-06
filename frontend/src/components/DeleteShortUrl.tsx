import { useState } from "react";
import { useDeleteShortUrlMutation } from "../api/shortUrlApi";
import { extractAlias } from "../lib/utils";

export function DeleteShortUrl() {
  const [input, setInput] = useState("");
  const [deleteShortUrl] = useDeleteShortUrlMutation();

  const handleDelete = async () => {
    const alias = extractAlias(input);
    if (!alias) {
      alert("Введите корректный alias или полный URL");
      return;
    }

    try {
      await deleteShortUrl(alias).unwrap();
      alert(`Ссылка с alias "${alias}" удалена`);
      setInput("");
    } catch {
      alert("Ошибка при удалении ссылки");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4 bg-zinc-900 rounded-lg shadow-lg mt-8 px-4">
      <h2 className="text-xl font-bold text-white text-center">
        Удалить ссылку
      </h2>
      <input
        type="text"
        className="border p-3 w-full rounded bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Введите alias или полный URL для удаления"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition font-semibold w-full disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleDelete}
        disabled={!input.trim()}
      >
        Удалить
      </button>
    </div>
  );
}
