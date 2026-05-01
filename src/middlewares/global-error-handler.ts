import express, { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = async (err, req, res, next) => {
   try {
      const message = err.message || "something went wrong!";
      const statusCode = 500;

      res.json({
         message,
         statusCode,
      });
   } catch (err) {
      next(err);
   }
};

export default globalErrorHandler;

