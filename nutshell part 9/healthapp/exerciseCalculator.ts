import { isNotNumber } from './utils.ts';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyExercises: number[],
  target: number,
): Result => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((hours) => hours > 0).length;
  const average =
    dailyExercises.reduce((sum, hours) => sum + hours, 0) / periodLength;
  const success = average >= target;

  let rating = 1;
  let ratingDescription = 'bad';

  if (average >= target) {
    rating = 3;
    ratingDescription = 'excellent';
  } else if (average >= target * 0.5) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArguments = (
  args: string[],
): { target: number; dailyExercises: number[] } => {
  if (args.length < 4) {
    throw new Error('Not enough arguments');
  }

  const target = Number(args[2]);
  const dailyExercises = args.slice(3).map(Number);

  if (isNotNumber(args[2]) || dailyExercises.some((value, index) => isNotNumber(args[index + 3]))) {
    throw new Error('Provided values were not numbers!');
  }

  return { target, dailyExercises };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, dailyExercises } = parseArguments(process.argv);
    console.log(calculateExercises(dailyExercises, target));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
