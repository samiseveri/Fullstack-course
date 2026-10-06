import { useState, type FormEvent } from 'react';
import { Visibility, Weather, type NewDiaryEntry } from '../types';

interface NewDiaryFormProps {
  onSubmit: (entry: NewDiaryEntry) => Promise<void>;
  error: string | null;
}

const NewDiaryForm = ({ onSubmit, error }: NewDiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  const addDiary = async (event: FormEvent) => {
    event.preventDefault();
    await onSubmit({ date, visibility, weather, comment });
    setComment('');
  };

  return (
    <div>
      <h2>Add a new entry</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={addDiary}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility
          {Object.values(Visibility).map((value) => (
            <label key={value} style={{ marginLeft: 8 }}>
              <input
                type="radio"
                name="visibility"
                value={value}
                checked={visibility === value}
                onChange={() => setVisibility(value)}
              />
              {value}
            </label>
          ))}
        </div>
        <div>
          weather
          {Object.values(Weather).map((value) => (
            <label key={value} style={{ marginLeft: 8 }}>
              <input
                type="radio"
                name="weather"
                value={value}
                checked={weather === value}
                onChange={() => setWeather(value)}
              />
              {value}
            </label>
          ))}
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewDiaryForm;
