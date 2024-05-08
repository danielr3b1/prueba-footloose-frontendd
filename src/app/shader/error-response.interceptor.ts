import { catchError, throwError } from "rxjs";
import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";

export const ErrorResponseInterceptor: HttpInterceptorFn = (req, next) => 
    next(req).pipe(catchError(handleErrorResponse))


function handleErrorResponse(error: HttpErrorResponse) {
    
    const errorResponse = error.error.message
    
    console.log(error)
    return throwError(() => errorResponse)

}