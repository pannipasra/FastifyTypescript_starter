import fastify from 'fastify';
import routes from './routes';


function buildFastify(opts = {}) {
    //---------------------------------------------
    // Initiate fastify
    //---------------------------------------------
    const app = fastify(opts);
    //---------------------------------------------
    // Error Handler Globally
    //---------------------------------------------
    app.setErrorHandler(function (error, request, reply) {
        const statusCode = error.statusCode;
        if (!statusCode || statusCode >= 500) {
            this.log.error(error);
            reply.status(500).send({
                statusCode: 500,
                code: "CUSTOM_ERR_INTERNAL_SERVER",
                error: "Internal Server Error",
                message: "Something went wrong in server."
            })
        } else {
            this.log.info(error)
            reply.status(statusCode).send(error);
        }
    })
    //---------------------------------------------
    // Plugin(s)
    //---------------------------------------------
    //---------------------------------------------
    // Route(s)
    //---------------------------------------------
    app.get('/', (req, reply) => { reply.send({ 'hello': 'world!' }) });
    app.register(routes.authRoute, { prefix: '/api/auth' });


    return app;
}
export default buildFastify;