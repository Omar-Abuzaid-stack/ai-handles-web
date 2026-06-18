import { useState, useEffect } from 'react';
import { CmsStore } from '../lib/store';
import type { Robot } from '../data';

export const useCmsData = () => {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      const fetchedRobots = await CmsStore.getRobots();
      if (mounted) {
        setRobots(fetchedRobots);
        setLoading(false);
      }
    };
    loadData();
    return () => { mounted = false; };
  }, []);

  return { robots, loading };
};
