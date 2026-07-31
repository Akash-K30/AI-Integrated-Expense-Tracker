export const errorHandler = (err, req, res, next) => {
  console.error(`❌ [Error]: ${err.message}`);
  console.error(err.stack);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  
  res.status(statusCode).json({
    message: err.message,
    // Only show stack trace in development, not production
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};