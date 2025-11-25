import React, { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (e) => setValue(e.target.value);
  const reset = () => setValue('');

  return {
    type,
    value,
    onChange,
    reset
  };
};

const Exercise7_7 = () => {
  const { reset, ...content } = useField('text');
  const { reset: resetAuthor, ...author } = useField('text');
  const { reset: resetInfo, ...info } = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ content: content.value, author: author.value, info: info.value });
    reset();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content: <input {...content} />
        </div>
        <div>
          Author: <input {...author} />
        </div>
        <div>
          Info: <input {...info} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Exercise7_7;
