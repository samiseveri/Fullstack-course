import { useEffect, useState } from 'react';
import axios from 'axios';
import DiaryList from './components/DiaryList';
import NewDiaryForm from './components/NewDiaryForm';
import diaryService from './services/diaries';
import type { DiaryEntry, NewDiaryEntry } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      const data = await diaryService.getAll();
      setDiaries(data);
    };
    void fetchDiaries();
  }, []);

  const submitDiary = async (entry: NewDiaryEntry) => {
    try {
      const created = await diaryService.create(entry);
      setDiaries(diaries.concat(created));
      setError(null);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const message = e.response?.data;
        if (typeof message === 'string') {
          setError(message);
        } else if (message && typeof message === 'object' && 'error' in message) {
          setError(JSON.stringify(message.error));
        } else {
          setError(e.message);
        }
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Unknown error');
      }
    }
  };

  return (
    <div>
      <NewDiaryForm onSubmit={submitDiary} error={error} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
