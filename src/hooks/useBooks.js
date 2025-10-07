import {useEffect, useRef, useState } from "react";
import { getBooksBySubject } from "../services/openLibrary";
export default function useBooks(genre){
    const [books,setBooks]=  useState([]);
    const [loading,setLoading]= useState(false);
    const [error,setError]= useState(null);
    const cacheRef= useRef({});
    useEffect(() => {
    if (!genre) {
      setBooks([]);
      setError(null);
      setLoading(false);
      return;
    }
    const subject =
      genre.toLowerCase() === "thriller" ? "thrillers" : "romance";

    if (cacheRef.current[subject]) {
      setBooks(cacheRef.current[subject]);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getBooksBySubject(subject, 50);
        if (cancelled) return;
        cacheRef.current[subject] = data;
        setBooks(data);
      } catch (err) {
        if (cancelled) return;
        console.error("useBooks error:", err);
        setError(err?.message ?? "Failed to load");
        setBooks([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [genre]);

  const refetch = async () => {
    if (!genre) return;
    const subject =
      genre.toLowerCase() === "thriller" ? "thrillers" : "romance";
    delete cacheRef.current[subject];
    setLoading(true);
    setError(null);
    try {
      const data = await getBooksBySubject(subject, 50);
      cacheRef.current[subject] = data;
      setBooks(data);
    } catch (err) {
      console.error("refetch error:", err);
      setError(err?.message ?? "Failed to load");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return { books, loading, error, refetch };
}
