## [2.0.0](https://github.com/AscentEssentials/ascent-essentials-backend/compare/1.2.0...2.0.0) (2024-01-02)


### ⚠ BREAKING CHANGES

* update post product route to handle image upload

### Features

* add health check route ([0be094b](https://github.com/AscentEssentials/ascent-essentials-backend/commit/0be094ba4fcc425c3af521f40bd943835ba5b35d))
* add images array to Product model ([f794755](https://github.com/AscentEssentials/ascent-essentials-backend/commit/f7947553ccdcfe4656c4f596d14049dda7d954d5))
* add input validation for the creation of a new category ([36ffef7](https://github.com/AscentEssentials/ascent-essentials-backend/commit/36ffef75c161950d48e8f315ad4a4a6b935b73ed))
* add Product model ([9e50313](https://github.com/AscentEssentials/ascent-essentials-backend/commit/9e50313f5ca89e404f69f0f61c2ec79b37569420))
* add route to Catch undefined routes ([2f45d09](https://github.com/AscentEssentials/ascent-essentials-backend/commit/2f45d09bf6e52a0c561fdc84c9e4ca2a67517559))
* controller for Product ([30caaee](https://github.com/AscentEssentials/ascent-essentials-backend/commit/30caaeeecd8f5c04ab2641e09b0a28510312fe49))
* Create the directory if it doesn't exist ([22a42de](https://github.com/AscentEssentials/ascent-essentials-backend/commit/22a42deb0e377eb9082545e014eedefa05530701))
* defined a new schema for Category response ([622cee2](https://github.com/AscentEssentials/ascent-essentials-backend/commit/622cee2e27ff0eff1061d3bbf3d0ded5bfc6f7bb))
* enable cors ([920c2bc](https://github.com/AscentEssentials/ascent-essentials-backend/commit/920c2bce58d83350582292cd8d5b081203b1f1de))
* removed not-yet-implemented routes ([d8a84ae](https://github.com/AscentEssentials/ascent-essentials-backend/commit/d8a84aec65c6351717848d1758ecc5dd4f0bf192))
* route to serve a specific product image ([e3538c1](https://github.com/AscentEssentials/ascent-essentials-backend/commit/e3538c10387c385f8d0f2a4e0d5a266ecb8f7ab2))
* update post product route to handle image upload ([4d412d2](https://github.com/AscentEssentials/ascent-essentials-backend/commit/4d412d2af0b18aabff01488e742e598f50509fd3))
* use a const to define path for product images ([4791b13](https://github.com/AscentEssentials/ascent-essentials-backend/commit/4791b13ef6d4fe43cf6dad039a1ace3a9e3e4bc4))
* use controller in create and get all products routes ([a46ec9d](https://github.com/AscentEssentials/ascent-essentials-backend/commit/a46ec9d0f0155ac3ccec152c7a0134795c000774))


### Dependency updates

* **deps:** update dependency @types/node to v20.10.6 ([1d73c3c](https://github.com/AscentEssentials/ascent-essentials-backend/commit/1d73c3c5254984bef3d21f64ac3d0dd52527850c))
* **deps:** update dependency @types/supertest to v6.0.2 ([2097a9d](https://github.com/AscentEssentials/ascent-essentials-backend/commit/2097a9dd7686b4fca25762a5dfa26959093632e6))


### Documentation

* add instruction to run in development mode in readme ([6b64e72](https://github.com/AscentEssentials/ascent-essentials-backend/commit/6b64e729e7a00f628cbf8edbe7ab475b14e5f659))
* define the request body without referencingto product schema ([db15822](https://github.com/AscentEssentials/ascent-essentials-backend/commit/db158225e64204374404e1025bbb14e0921e7b9f))
* edit Product schema ([8268b7b](https://github.com/AscentEssentials/ascent-essentials-backend/commit/8268b7b88745dce157a877b87851023ce071ca27))
* refer to product schema for product uplaod ([4dde56e](https://github.com/AscentEssentials/ascent-essentials-backend/commit/4dde56e46e35d009fae64a036d52b263eedafec3))


### Tests

* change status code to check ([b90d97e](https://github.com/AscentEssentials/ascent-essentials-backend/commit/b90d97e84d9d3b8bd663cff610b125fcae4a07a6))


### Build and continuous integration

* add cors dependency ([c12dbed](https://github.com/AscentEssentials/ascent-essentials-backend/commit/c12dbed71587c0e878161751c483fb079d8b0f48))
* add multer dependency (for file upload) ([d73b2e9](https://github.com/AscentEssentials/ascent-essentials-backend/commit/d73b2e9cdc1eda2f8c3e35e7a0e6b983ecd48ac2))


### Refactoring

* 'price' field type from 'Types.Decimal128' to 'Number' ([d980056](https://github.com/AscentEssentials/ascent-essentials-backend/commit/d98005661c90f977a39cc0753adc57458035738f))
* move multer config in a dedicated file in utils ([b8fcfbf](https://github.com/AscentEssentials/ascent-essentials-backend/commit/b8fcfbfb43ba9759dd9db0e8e9b0ddb993ff1ecd))

## [1.2.0](https://github.com/AscentEssentials/ascent-essentials-backend/compare/1.1.0...1.2.0) (2023-12-29)


### Features

* add category routes ([996b7ff](https://github.com/AscentEssentials/ascent-essentials-backend/commit/996b7ff2722b854c5bf0e9f497f1c07ae3b62c36))
* add controller for Category ([075037b](https://github.com/AscentEssentials/ascent-essentials-backend/commit/075037bd20c0d85ff69f06d6881940d61c064c9c))
* add JSON body parser middleware ([9725d91](https://github.com/AscentEssentials/ascent-essentials-backend/commit/9725d914017a59d18372cc3f543379da96887f2e))
* model for a Category ([2f0af09](https://github.com/AscentEssentials/ascent-essentials-backend/commit/2f0af0921c1427f094d196484bd08383cfbd16e8))
* mongoose connection to db ([66c7d3d](https://github.com/AscentEssentials/ascent-essentials-backend/commit/66c7d3d05208cdf4643c3ab180142b1169b28982))


### Dependency updates

* **deps:** update dependency @types/supertest to v6 ([56a3180](https://github.com/AscentEssentials/ascent-essentials-backend/commit/56a3180f3e9acf1422792abbe9a9a6f0b5890782))
* **deps:** update dependency semantic-release-preconfigured-conventional-commits to v1.1.85 ([bd75235](https://github.com/AscentEssentials/ascent-essentials-backend/commit/bd752354773952a31a196a0ca8a582975a002c69))


### Bug Fixes

* remove circular import ([5acb5ae](https://github.com/AscentEssentials/ascent-essentials-backend/commit/5acb5aebb62cc748d11496ec4aa8ac7bb06039cb))
* start script path now is correct ([9e4380e](https://github.com/AscentEssentials/ascent-essentials-backend/commit/9e4380e70ffc337505390342803909babe3b36d1))


### Documentation

* add details for environment variables ([907b2fb](https://github.com/AscentEssentials/ascent-essentials-backend/commit/907b2fb94f15056b27806c70b87fb6d89cb82365))
* add openapi description for category routes ([93ae859](https://github.com/AscentEssentials/ascent-essentials-backend/commit/93ae8591c7e76d34b7a90ea2517959f3a3282808))
* improve readme environment variable description ([c03fa05](https://github.com/AscentEssentials/ascent-essentials-backend/commit/c03fa0557f06c101f833a6d612833402baeabf66))
* refer to the Product schema in the swagger routes documentation ([422417c](https://github.com/AscentEssentials/ascent-essentials-backend/commit/422417cb63b42db5a84ed9ecaedadb38c58793e5))
* update openapi Category schema, removing id ([fdd6907](https://github.com/AscentEssentials/ascent-essentials-backend/commit/fdd6907097421be16c8c47797277114909d480f9))
* update readme adding MONGODB_URL as required environment variable ([e3b97e4](https://github.com/AscentEssentials/ascent-essentials-backend/commit/e3b97e4da21182574a0bd2f36553038f61d070c8))
* update readme with mongodb env variable ([fa5e064](https://github.com/AscentEssentials/ascent-essentials-backend/commit/fa5e0648ee444ee64066105811e7c619efe67797))


### Tests

* fix test ([b3293e3](https://github.com/AscentEssentials/ascent-essentials-backend/commit/b3293e3efed7c1ddc72d5d394da652fda6270b47))


### Build and continuous integration

* add mongodb url as env variable ([8cb80dc](https://github.com/AscentEssentials/ascent-essentials-backend/commit/8cb80dc7f21ca30435d09ebbcd5aa16c3c8d3888))
* add mongoode depencency ([2f2e8a9](https://github.com/AscentEssentials/ascent-essentials-backend/commit/2f2e8a99aa6eebc285ef59ce8c340da5b53697f8))


### General maintenance

* remove deprecated option of mongoose connection ([0f39ea6](https://github.com/AscentEssentials/ascent-essentials-backend/commit/0f39ea69e0ac1ce6db9cc5ef5ec516f891b090f7))
* remove unused dotenv and his import ([14b2434](https://github.com/AscentEssentials/ascent-essentials-backend/commit/14b24347af0ce0a30bc7562eaf8a32ad2a15df8e))
* remove unused log ([af95482](https://github.com/AscentEssentials/ascent-essentials-backend/commit/af95482b329f37cb09cd917b57e51c89816d48a5))
* use import instead of require ([0eeb502](https://github.com/AscentEssentials/ascent-essentials-backend/commit/0eeb502fa30397349325a7e8981b8fdd55a2c150))


### Refactoring

* change MONGODB_URL default value ([42154f7](https://github.com/AscentEssentials/ascent-essentials-backend/commit/42154f7cf0c2a11299b0a71ca515dede034d2f9c))
* move the definition of routes in a dedicated file ([6329e25](https://github.com/AscentEssentials/ascent-essentials-backend/commit/6329e25ce305847f2063c201acd98af5ea713994))
* set swagger server with the same port defined in server.ts ([26a7ec1](https://github.com/AscentEssentials/ascent-essentials-backend/commit/26a7ec1c5d945eaf345bf89d110a8c99aaff3342))

## [1.1.0](https://github.com/AscentEssentials/ascent-essentials-backend/compare/1.0.0...1.1.0) (2023-12-21)


### Features

* add Category schema for swagger documentation ([548d21a](https://github.com/AscentEssentials/ascent-essentials-backend/commit/548d21a9c744b2f5eb9ace2518d651b9a75acf09))
* add file to watch to generate api from ([53af69b](https://github.com/AscentEssentials/ascent-essentials-backend/commit/53af69b5d1a199b2a9cda283f5bb9cec6240a58b))
* add schema for Product as swagger documentation ([8604a2a](https://github.com/AscentEssentials/ascent-essentials-backend/commit/8604a2a7a794d98b67cdc6b0ad228f7520bafaac))
* define routes to handle products ([57a7dec](https://github.com/AscentEssentials/ascent-essentials-backend/commit/57a7decf5c61df60a0c587f71112050688552ae0))
* provide routes to consult API ([e94a868](https://github.com/AscentEssentials/ascent-essentials-backend/commit/e94a868c9f8a44aaa1157b2aa7a67f3b85e52d3e))
* remove swagger ui for manual defined api ([73b75bb](https://github.com/AscentEssentials/ascent-essentials-backend/commit/73b75bbd916c93c468c6c6c49273360007357238))


### Documentation

* add instruction on how to run the server and removed endpoint for manually defined api ([450cb80](https://github.com/AscentEssentials/ascent-essentials-backend/commit/450cb804e2b318f3ccdf6afdb27eed758d0123d4))
* add readme with API Endpoints guide ([1bb1229](https://github.com/AscentEssentials/ascent-essentials-backend/commit/1bb1229c08c38e65f2290f894a10a3626dd5362b))


### Build and continuous integration

* add dependencies for swagger ([b80d205](https://github.com/AscentEssentials/ascent-essentials-backend/commit/b80d2058e7f3f13596151dd630756c2c9e5c0c37))


### General maintenance

* remove unused import ([cd5ca9c](https://github.com/AscentEssentials/ascent-essentials-backend/commit/cd5ca9c943370b0873d44bdc719e1534792f2451))


### Refactoring

* move swagger configuration to another file ([ee92ae6](https://github.com/AscentEssentials/ascent-essentials-backend/commit/ee92ae65e44e441d6d64f683dc5c895a03ab9ec0))

## 1.0.0 (2023-12-20)


### Documentation

* Add OpenAPI documentation for product API ([7a59d03](https://github.com/AscentEssentials/ascent-essentials-backend/commit/7a59d03db16dd8db1cc5b959e3aae62c82b76b6f))


### Build and continuous integration

* configure semantic release ([7f2246f](https://github.com/AscentEssentials/ascent-essentials-backend/commit/7f2246fbc6f307f71480be225cbd9e378fab2205))


### General maintenance

* add Express project ([6014c46](https://github.com/AscentEssentials/ascent-essentials-backend/commit/6014c4609960438b3e3dc3052b03ed7b7a25b5b5))
* add git-hooks submodule ([ec33a07](https://github.com/AscentEssentials/ascent-essentials-backend/commit/ec33a07d832580725fe1df6222fc84e2f5077a91))
* add Jest ([ba4665b](https://github.com/AscentEssentials/ascent-essentials-backend/commit/ba4665b4a033a41a54aafecba3e63deb8400551c))
* add license ([8b41c2f](https://github.com/AscentEssentials/ascent-essentials-backend/commit/8b41c2f780d8d150d916046866df2b94bebff94c))
* add package-lock.json ([3bdb5e8](https://github.com/AscentEssentials/ascent-essentials-backend/commit/3bdb5e86b99fd089363024b869c84c592b448abc))
* add repository files ([136d637](https://github.com/AscentEssentials/ascent-essentials-backend/commit/136d6379a14a465be8bfec220034121a039ec623))
* change project configuration ([b45a95d](https://github.com/AscentEssentials/ascent-essentials-backend/commit/b45a95daa0b3c7e2ac3917302109ae62cee8143d))
