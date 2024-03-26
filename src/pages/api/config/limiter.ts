/*
* Author: Torjus A.M
* Rate limiter for the API routes. Avoid abuse of the API and DDoS attacks
* by limiting the amount of requests a that can be made to the server.
*/
import {RateLimiter} from "limiter";

// General limiter for most requests
export const limiter = new RateLimiter({
    tokensPerInterval: 20,
    interval: 'minute',
    fireImmediately: true,
});

// Signin limiter has a lower limit than the general limiter to prevent brute force attacks.
export const signinLimiter = new RateLimiter({
    tokensPerInterval: 10,
    interval: 'hour',
    fireImmediately: true,
});