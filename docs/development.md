# Development

## Technical design decisions
Typescript as programming language: large community and good support for wallet related libraries. Of course it does not perform as good as Rust, but it's easier to write and maintain for the current state of the project. It is possible to write different parts of the project in Rust or any other language later on.

Angular as frontend framework: All frontend applications are written in Angular. There was no intention to build a react native application so far, but it is possible to do so. Since the client is primarily job is to render information and not to execute business actions, other clients like a react native app, vanilla js or even a flutter app can be implemented.

Nestjs as backend framework: Nestjs is one of the popular frameworks for nodejs. The build in database connection, the openAPI support and the easy validation of incoming requests are the main reasons to use it. It is also possible to write the backend in Rust or any other language later on.

NX as monorepo manager: NX is a great tool to manage a monorepo. It is possible to share code between the applications and to define the jobs for building, testing and linting in one place. It is also possible to define the dependencies between the applications and to run the jobs in the right order.

## Requirements
- node v20 (https://nodejs.org/en/download/package-manager)
- pnpm v8 (v9 has some issues with the nx workspace)

For an easy development setup, it is recommend to use vscode with the nx plugin to start tasks like building, testing and linting or to generate new code. You can also use Webstorm with the nx plugin, [see here](https://nx.dev/getting-started/editor-setup#official-integrations).


### Keycloak (OIDC provider)
to manage the user accounts from the cloud wallet, an OIDC provider is required. This repository offers a self hosted keycloak instance that you can use. It's a basic setup without a customized registration flow, so the user registers only with an email and password. Password reset is also possible via email, but the smtp credentials have to be set in the keycloak settings manually.

The realm is located in the `config/keycloak/realm-export.json` file. In case you want to use another keycloak instance, you can import the realm there. It should also be possible to use any other OIDC system.

In the default realm settings, there is no restriction to the origin of the requests and registration is open for everyone. There is also no implementation of keycloak or cloud wallet events like creating or deleting a user object.

Webauthn is implemented, but not configured for the registration. It can be added via settings page in the wallets. The primary authentication method is the password, since we do not want to rely on just one device for login for now.

## Development
To install all dependencies, run `pnpm install` in the root folder.

Each app has its own `package.json` with specific jobs. In the root folder is one `package.json` with global jobs like `build`, `clean` and `lint`.

The command `pnpm run -r init` will generate `.env` files for each app based on the example file. Applications inside the `apps` folder will not use the `.env` file in the root folder, this is only for the docker-compose setup. Instead use the `.env` files in the apps folder. In case it's an angular application, use the config file in the `assets/config` folder.

## Issuer
The issuer app is a rest api, supporting the oid4vci protocol. Right now there is only one demo credential available. Start the issuer with `pnpm run dev`. Don't forget to have an `.env` file in the folder to configure the application, it will not use the `.env` file in the root folder.

## Verifier
The verifier app is a rest api, supporting the oid4vp protocol. The verifier can verify the demo credential from the issuer. Start the verifier with `pnpm run dev`. Don't forget to have an `.env` file in the folder to configure the application, it will not use the `.env` file in the root folder.

## Wallet clients
This repository includes two clients. One is a progressive web app, the other one is a chrome browser extension. Both are managed via angular and share the same code base.

Since the backend is following the openAPI specification, an SDK to interact with it can be generated by running `pnpm run api`. To run this command, Java needs to be installed on the system.

### PWA Client
The command `pnpm run start:pwa` will run the application in the watch mode. It will start a web server on `localhost:4200` and reload when you changed the code. The configuration is managed in the `assets/config` folder. This approach allows a dynamic config since it can be mounted into the docker container without the need of recompiling it.

### Browser Plugin
The command `pnpm run start:extension` in the `holder` folder will watch on the build files. To use this plugin in the chrome browser during development, go to `chrome://extensions/` and enable developer mode. Then click on `Load unpacked` and select the `dist/browser-extension` folder in the `browser-extension` folder. To get the updates active, you need to reopen the plugin in the browser (hitting refresh on the plugin page is not required).

Angular is using the webpack compiler instead of the modern esbuild. This is required since we need to build multiple file like the main and background file and right now it is not possible to pass a custom esbuild config to angular.

To build the plugin for production, run `pnpm run build:extension`. The output will be in the `dist/browser-extension` folder like the start command, but the files are minified and optimized for production.

## Backend
All endpoints are available via the `http://localhost:3000` address. A swagger endpoint is available at `http://localhost:3000/api` where you can authenticate with your keycloak user credentials. Don't forget to have an `.env` file in the folder to configure the application, it will not use the `.env` file in the root folder.

You can either use a postgres or sqlite database. In case of using postgres, there is one defined in the `docker-compose.yml` in the root folder. Don't forget to sync the credentials in the root `.env` file and the one in the backend folder to get a successful connection.
