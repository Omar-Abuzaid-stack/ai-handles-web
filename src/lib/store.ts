import { isSupabaseConfigured, supabase } from './supabase';
import { robots as defaultRobots } from '../data';
import type { Robot } from '../data';

// Local storage keys
const KEYS = {
  ROBOTS: 'vantility_cms_robots',
  // other keys later
};

// Seed initial data if nothing exists locally
function initLocalStore() {
  if (!localStorage.getItem(KEYS.ROBOTS)) {
    localStorage.setItem(KEYS.ROBOTS, JSON.stringify(defaultRobots));
  }
}
initLocalStore();

export const CmsStore = {
  getRobots: async (): Promise<Robot[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('robots').select('*').order('display_order', { ascending: true });
      if (error) {
        console.error('Supabase error fetching robots:', error);
        return [];
      }
      return data || [];
    } else {
      // Local fallback
      const stored = localStorage.getItem(KEYS.ROBOTS);
      return stored ? JSON.parse(stored) : [];
    }
  },
  
  saveRobot: async (robot: Robot): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('robots').upsert(robot);
      if (error) {
        console.error('Supabase error saving robot:', error);
        return false;
      }
      return true;
    } else {
      const robots = await CmsStore.getRobots();
      const existingIdx = robots.findIndex(r => r.id === robot.id);
      if (existingIdx > -1) {
        robots[existingIdx] = robot;
      } else {
        robots.push(robot);
      }
      localStorage.setItem(KEYS.ROBOTS, JSON.stringify(robots));
      return true;
    }
  }
};
