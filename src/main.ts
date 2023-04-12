import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import * as morgan from "morgan"
import { NestExpressApplication } from "@nestjs/platform-express"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: ["error", "warn"]
	})
	app.use(morgan("tiny"))
	const config = new DocumentBuilder()
		.setTitle("Learning vocab backend API")
		.setVersion("0.0.1")
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup("swagger", app, document)
	const port = process.env.PORT || 3000
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			forbidUnknownValues: true,
			enableDebugMessages: true
		}),
	)
	
	console.log(`Listening on port ${port}`)
	await app.listen(port)
}
bootstrap() 
