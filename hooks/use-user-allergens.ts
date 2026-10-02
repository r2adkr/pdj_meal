'use client';

import { useSyncExternalStore, useMemo, useCallback } from 'react';

const emptyAllergens: number[] = [];

function subscribeAllergens(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('allergens-changed', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('allergens-changed', callback);
  };
}

function getAllergensSnapshot(): string {
  try {
    return localStorage.getItem('djhs_user_allergens') || '[]';
  } catch {
    return '[]';
  }
}

function getServerAllergensSnapshot(): string {
  return '[]';
}

export function useUserAllergens() {
  const allergensRaw = useSyncExternalStore(
    subscribeAllergens,
    getAllergensSnapshot,
    getServerAllergensSnapshot
  );

  const allergens = useMemo(() => {
    try {
      return JSON.parse(allergensRaw) as number[];
    } catch {
      return emptyAllergens;
    }
  }, [allergensRaw]);

  const setAllergens = useCallback((newCodes: number[]) => {
    try {
      localStorage.setItem('djhs_user_allergens', JSON.stringify(newCodes));
      window.dispatchEvent(new Event('allergens-changed'));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleAllergen = useCallback((code: number) => {
    try {
      const current = JSON.parse(getAllergensSnapshot()) as number[];
      const next = current.includes(code)
        ? current.filter((c) => c !== code)
        : [...current, code];
      setAllergens(next);
    } catch {
      setAllergens([code]);
    }
  }, [setAllergens]);

  return { allergens, setAllergens, toggleAllergen };
}
