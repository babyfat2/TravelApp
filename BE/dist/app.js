"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleWare = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./middleware/auth");
const global_1 = __importDefault(require("./routes/global"));
const auth_2 = __importDefault(require("./routes/auth"));
const services_1 = __importDefault(require("./routes/services"));
const ErrorHandler_1 = require("./controller/error/ErrorHandler");
const user_1 = __importDefault(require("./routes/user"));
const http_1 = __importDefault(require("http"));
const helmet_1 = __importDefault(require("helmet"));
const rateLimiter_1 = require("./middleware/validation/rateLimiter");
const chat_1 = __importDefault(require("./routes/chat"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("redis");
const destination_1 = __importDefault(require("./routes/destination/destination"));
let redisClient = (0, redis_1.createClient)({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});
redisClient.connect().catch(console.error);
redisClient.on("ready", () => {
    console.log("Client is ready");
    // redisClient.flushDb().then((e) => {
    //   console.log("flush", e);
    // });
});
redisClient.on("error", (err) => {
    console.error("Error occurred:", err);
});
let redisStore = new connect_redis_1.default({
    client: redisClient,
    prefix: "Travel:",
});
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.sessionMiddleWare = (0, express_session_1.default)({
    secret: process.env.SECRET,
    resave: false,
    store: redisStore,
    saveUninitialized: false,
});
server.headersTimeout = 5000;
server.requestTimeout = 10000;
app.set("trust proxy", 1);
app.use(exports.sessionMiddleWare);
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
var accessLogStream = fs_1.default.createWriteStream(path_1.default.join("./", "access.log"), {
    flags: "a",
});
// setup the logger
app.use((0, morgan_1.default)("combined", { stream: accessLogStream }));
app.use((0, morgan_1.default)("combined"));
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(rateLimiter_1.apiLimiter);
app.use("/api", global_1.default);
app.use("/api/destination", auth_1.blockJWT, auth_1.protect, destination_1.default);
app.use("/api/auth", rateLimiter_1.authRateLimiter, auth_2.default);
app.use("/api/services", auth_1.blockJWT, auth_1.protect, services_1.default);
app.use("/api/user", auth_1.blockJWT, auth_1.protect, user_1.default);
app.use("/api/chat", auth_1.blockJWT, auth_1.protect, chat_1.default);
app.use(ErrorHandler_1.ErrorHandler);
exports.default = server;
