## [9.0.0](https://github.com/AscentEssentials/ascent-essentials-backend/compare/8.1.2...9.0.0) (2024-01-09)


### ⚠ BREAKING CHANGES

* require quantity in addToCart function

### Features

* implement a function to calculate the total of the cart, based on products that are on it ([adc8033](https://github.com/AscentEssentials/ascent-essentials-backend/commit/adc80339581eb92ccb63499711a2efafac2467bd))
* remove useless fetch and check ([65dc8f4](https://github.com/AscentEssentials/ascent-essentials-backend/commit/65dc8f4aec6bf62d32ab163af1e3db531ca29c6c))
* require quantity in addToCart function ([c35d6b3](https://github.com/AscentEssentials/ascent-essentials-backend/commit/c35d6b329623efe2446bbb05e3d7430f51c2a2b0))
* set default value for cartTotal to 0 ([05555b5](https://github.com/AscentEssentials/ascent-essentials-backend/commit/05555b53af3041a32e2beb454e6ad52091e2d548))
* use getCartTotal function to calculate the total ([a55c337](https://github.com/AscentEssentials/ascent-essentials-backend/commit/a55c337543ee14f203f1380958c2d09076c789d1))


### Documentation

* update swagger docs to require quantity in /cart/add ([2a6c868](https://github.com/AscentEssentials/ascent-essentials-backend/commit/2a6c868291b07fafa7e8d164db542e0f1d6628ab))

## [8.1.2](https://github.com/AscentEssentials/ascent-essentials-backend/compare/8.1.1...8.1.2) (2024-01-08)


### Bug Fixes

* in POST and PUT routes, take parameters from body instead of query ([2480555](https://github.com/AscentEssentials/ascent-essentials-backend/commit/2480555fa88a0ed7c2acd1e5183123e62df7522e))


### Documentation

* update swagger docs, now parameters are in the body for PUT and POST routes ([77431bc](https://github.com/AscentEssentials/ascent-essentials-backend/commit/77431bc0c97a829d8c5ffb2cc6a5e299a4359a81))

## [8.1.1](https://github.com/AscentEssentials/ascent-essentials-backend/compare/8.1.0...8.1.1) (2024-01-08)


### Bug Fixes

* product price is now a "number" instead of a "Number" ([dbddb36](https://github.com/AscentEssentials/ascent-essentials-backend/commit/dbddb3608bfbfbca006933a4de916fbf00d6a2de))

## [8.1.0](https://github.com/AscentEssentials/ascent-essentials-backend/compare/8.0.0...8.1.0) (2024-01-07)


### Features

* print error message in the console ([7d1d8ec](https://github.com/AscentEssentials/ascent-essentials-backend/commit/7d1d8ec680ccedf701d3af4234156e95dd1d6fac))

## [8.0.0](https://github.com/AscentEssentials/ascent-essentials-backend/compare/7.4.0...8.0.0) (2024-01-07)


### ⚠ BREAKING CHANGES

* provide route to Update the quantity of a product in the cart
* provide a route to clear the cart
* provide route to remove a product from the cart
* add route to add a product to cart
* add route to retrieve the cart

### Features

* add cart model ([af55563](https://github.com/AscentEssentials/ascent-essentials-backend/commit/af55563bbf9086f54c5b39d2bd07e7c221375357))
* add route to add a product to cart ([7c7b6d6](https://github.com/AscentEssentials/ascent-essentials-backend/commit/7c7b6d66095ce3f2dfede7f0752f6c57e44f7e1a))
* add route to retrieve the cart ([29fe624](https://github.com/AscentEssentials/ascent-essentials-backend/commit/29fe6240314856b4b5e407e1f01ba2b7cf0e0777))
* provide a route to clear the cart ([f18af66](https://github.com/AscentEssentials/ascent-essentials-backend/commit/f18af66695a1c9b4d8938d52882fb6c46b769e99))
* provide route to remove a product from the cart ([ce726a8](https://github.com/AscentEssentials/ascent-essentials-backend/commit/ce726a89e1b071c0ab499259f414bc6f3dd0eff1))
* provide route to Update the quantity of a product in the cart ([54f7c08](https://github.com/AscentEssentials/ascent-essentials-backend/commit/54f7c0813b4d1c9ca89c7082d5bc02f53bc16ade))


### Documentation

* update delete cart description in swagger ([a24c427](https://github.com/AscentEssentials/ascent-essentials-backend/commit/a24c42771950c8b0db9a9b6a7ab013aeb8b2b6ce))
* update swagger response for cart routes ([5081805](https://github.com/AscentEssentials/ascent-essentials-backend/commit/5081805aa87c06a30c3d23d246dad9d030395bde))


### Refactoring

* rename field: orderTotal -> cartTotal ([f9199f9](https://github.com/AscentEssentials/ascent-essentials-backend/commit/f9199f9618c8dce9b4c394e9a01c39dfdcfc9e67))

## [7.4.0](https://github.com/AscentEssentials/ascent-essentials-backend/compare/7.3.0...7.4.0) (2024-01-06)


### Features

* add authentication to post category route ([f359863](https://github.com/AscentEssentials/ascent-essentials-backend/commit/f359863e20df8353fcad86201d8042e5f0170e39))
* add authentication to some product routes ([9e43102](https://github.com/AscentEssentials/ascent-essentials-backend/commit/9e43102459104fe4d419d51c03e4ab4a2fb8d1e4))
* add authentication to some subcategory routes ([0d452f7](https://github.com/AscentEssentials/ascent-essentials-backend/commit/0d452f71773cf1676e12022d124480f4f0d61d98))
* check if isAdmin to some product routes ([181d56e](https://github.com/AscentEssentials/ascent-essentials-backend/commit/181d56e1a4a18051d504ddf990197033c1818d31))
* check if isAdmin to some subcategory routes ([bd768f5](https://github.com/AscentEssentials/ascent-essentials-backend/commit/bd768f5d5220cc1c7a5b61ed4a19c4e94c813bf3))


### Style improvements

* format subCategoryRoutes.ts ([a1b7cdd](https://github.com/AscentEssentials/ascent-essentials-backend/commit/a1b7cddfd07f91d9bd17975ada21a939c6082341))


### Refactoring

* change name of authentication function ([d603361](https://github.com/AscentEssentials/ascent-essentials-backend/commit/d6033613532824e87f405e31f01bdacaa9da5e5a))

## [7.3.0](https://github.com/AscentEssentials/ascent-essentials-backend/compare/7.2.0...7.3.0) (2024-01-06)


### Features

* provide /api-docs route only if env ENABLE_DOCS=true ([a06e98f](https://github.com/AscentEssentials/ascent-essentials-backend/commit/a06e98f03e6210fc05956f409956acc39d7ba06c))
* set env variable ENABLE_DOCS=true in dev script ([8e3b8aa](https://github.com/AscentEssentials/ascent-essentials-backend/commit/8e3b8aa2336f9e9615dfed8d68f198631466ef96))


### Documentation

* update Readme ([4b0b9d4](https://github.com/AscentEssentials/ascent-essentials-backend/commit/4b0b9d43e1758b1418840ec4afc6051d4da88acc))


### General maintenance

* improve log for docs endpoint ([4275370](https://github.com/AscentEssentials/ascent-essentials-backend/commit/4275370d2a8c9bca4b6daa5bb918cccfac278077))

## [7.2.0](https://github.com/AscentEssentials/ascent-essentials-backend/compare/7.1.0...7.2.0) (2024-01-06)


### Features

* provide token when a new user register ([ba95b0c](https://github.com/AscentEssentials/ascent-essentials-backend/commit/ba95b0cfde0c04191ca1af1b922ee32958b7052f))

## [7.1.0](https://github.com/AscentEssentials/ascent-essentials-backend/compare/7.0.0...7.1.0) (2024-01-06)


### Features

* provide isAdmin value with user details ([b40a81d](https://github.com/AscentEssentials/ascent-essentials-backend/commit/b40a81d48a1ca31227d200ad5cb9412c4db585fe))


### General maintenance

* remove useless sentence in Readme ([ec38f99](https://github.com/AscentEssentials/ascent-essentials-backend/commit/ec38f99cda568c403930c0920c8897e391e1e4a5))

## [7.0.0](https://github.com/AscentEssentials/ascent-essentials-backend/compare/6.0.0...7.0.0) (2024-01-06)


### ⚠ BREAKING CHANGES

* add a route to retrieve user details
* user routes to register and login

### Features

* add a /protected route to test auth ([cef0b08](https://github.com/AscentEssentials/ascent-essentials-backend/commit/cef0b08a6562df10a9e2cb95ffd8033fce75560e))
* add a route to retrieve user details ([b6e20e4](https://github.com/AscentEssentials/ascent-essentials-backend/commit/b6e20e4be041ad802037fe060821144b706a7a57))
* add addressNumber and zipCode in user data ([13835c1](https://github.com/AscentEssentials/ascent-essentials-backend/commit/13835c1b9869dd312c219b5abeb909d62ae29c4a))
* add auth middleware ([21a8305](https://github.com/AscentEssentials/ascent-essentials-backend/commit/21a8305ef0e6d508d51ea85f21a63b10d7383cc4))
* add isAdmin field to user ([d52ab06](https://github.com/AscentEssentials/ascent-essentials-backend/commit/d52ab06574e282f8762044cbcaea780189ba9c1b))
* add user Controller ([4730bfd](https://github.com/AscentEssentials/ascent-essentials-backend/commit/4730bfdeaf29a6f815cb549766396aa2527b810b))
* add user Model ([cf33519](https://github.com/AscentEssentials/ascent-essentials-backend/commit/cf33519e35d0f503118784da279459897dbdf497))
* Check if the email is already registered ([6b291df](https://github.com/AscentEssentials/ascent-essentials-backend/commit/6b291df9054f412a160317c1d8a0788ebcbe263a))
* improve authentication.ts ([971ead9](https://github.com/AscentEssentials/ascent-essentials-backend/commit/971ead9095d6fdfe91431b5f8da31ac5b28a4c2e))
* removed route used for tests ([1ec668a](https://github.com/AscentEssentials/ascent-essentials-backend/commit/1ec668a9489220c0ca695de6b9e04fbae2b1cae2))
* user routes to register and login ([5e34f52](https://github.com/AscentEssentials/ascent-essentials-backend/commit/5e34f52727fa79efc9da9eb687f12761bff6f088))


### Documentation

* add Authentication in Readme ([9d6921e](https://github.com/AscentEssentials/ascent-essentials-backend/commit/9d6921e263bed6fba8039ed4f4c72f07b81ef8b8))
* add bearer auth to swagger ([505afb7](https://github.com/AscentEssentials/ascent-essentials-backend/commit/505afb779b43ef8256811fa852a2be5838f958c7))
* add swagger doc for user model ([3f64152](https://github.com/AscentEssentials/ascent-essentials-backend/commit/3f64152683a76b6cc24a4e1c3f1a79adc482c829))
* add UserResponse schema for swagger ([5edb3d1](https://github.com/AscentEssentials/ascent-essentials-backend/commit/5edb3d11551e6ac16d8109c4212d2f0d923cda1b))
* update api-docs url in Readme ([e5e28f9](https://github.com/AscentEssentials/ascent-essentials-backend/commit/e5e28f90105f7d7f483ff9d68f7299f9b7ddd913))
* update product schema to match the actual implementation ([279905f](https://github.com/AscentEssentials/ascent-essentials-backend/commit/279905f7afe3ce148ffb57eabfa0146dabacbe4c))
* update readme with JWT_SECRET env variable ([984951d](https://github.com/AscentEssentials/ascent-essentials-backend/commit/984951d1deacafe24e268dfb798cdd45bce7165c))
* update user swagger doc ([9ab8081](https://github.com/AscentEssentials/ascent-essentials-backend/commit/9ab80815aeec7bf3167aa8d08297806aeac5b7fd))


### Build and continuous integration

* add jsonwebtoken and bcrypt dependencies ([f7c3c38](https://github.com/AscentEssentials/ascent-essentials-backend/commit/f7c3c3808d5865bfda96fd5bc9303134306fda3d))


### General maintenance

* add a log that indicate the url for docs ([427a015](https://github.com/AscentEssentials/ascent-essentials-backend/commit/427a0155159f24c2ee864c2ecbab7698604a6afd))
* correct response status message ([012b2e6](https://github.com/AscentEssentials/ascent-essentials-backend/commit/012b2e66766c6b66ec0b14e75579af94e85e12d6))
* remove useless comment ([dac30c7](https://github.com/AscentEssentials/ascent-essentials-backend/commit/dac30c73a356d93406e6e874b5a5a0e7bdf1da5e))


### Refactoring

* move jwt_secret key declaration to authentication.ts file ([6603979](https://github.com/AscentEssentials/ascent-essentials-backend/commit/6603979a1dbb07c6be5ccddeec5da1bc8655c04b))

## [6.0.0](https://github.com/AscentEssentials/ascent-essentials-backend/compare/5.1.0...6.0.0) (2024-01-04)


### ⚠ BREAKING CHANGES

* add route to retrieve all products in a category

### Features

* add route to retrieve all products in a category ([80a1c87](https://github.com/AscentEssentials/ascent-essentials-backend/commit/80a1c87999e6d959c68541481d120ba9ef6c0ef0))

## [5.1.0](https://github.com/AscentEssentials/ascent-essentials-backend/compare/5.0.0...5.1.0) (2024-01-04)


### Features

* improve product search flexibility ([83d4ebb](https://github.com/AscentEssentials/ascent-essentials-backend/commit/83d4ebb05e6a88f58745253bfb5edc907a384b89))

## [5.0.0](https://github.com/AscentEssentials/ascent-essentials-backend/compare/4.0.0...5.0.0) (2024-01-03)


### ⚠ BREAKING CHANGES

* provide route to search products

### Features

* provide route to search products ([d3446f5](https://github.com/AscentEssentials/ascent-essentials-backend/commit/d3446f576af85cdcf7139b7b913e0ce2f90cdaa4))


### Documentation

* add description to product search endpoint in Swagger ([7db3dff](https://github.com/AscentEssentials/ascent-essentials-backend/commit/7db3dff9af303bb288bac17c775f8ae20a58b297))
* remove openapi yaml file (the swagger doc is generated from code) ([49f31b3](https://github.com/AscentEssentials/ascent-essentials-backend/commit/49f31b3d3405412731cfdd8e4c11d40ff3366d5b))

## [4.0.0](https://github.com/AscentEssentials/ascent-essentials-backend/compare/3.0.0...4.0.0) (2024-01-03)


### ⚠ BREAKING CHANGES

* add route to delete a product
* add route to edit a product
* add route to provide details of a product by its id
* add route to retrieve all products of a subcategory

### Features

* add route to delete a product ([f03465b](https://github.com/AscentEssentials/ascent-essentials-backend/commit/f03465b428fb4d8fdd1bb5f0a0a52dbea2a7fc90))
* add route to edit a product ([3f277cc](https://github.com/AscentEssentials/ascent-essentials-backend/commit/3f277cc3b31779bdfd5844e0e2ba89236aaa075e))
* add route to provide details of a product by its id ([2219917](https://github.com/AscentEssentials/ascent-essentials-backend/commit/2219917afbcc6eee9d9d800220009c5ba557ea31))
* add route to retrieve all products of a subcategory ([5c6c19f](https://github.com/AscentEssentials/ascent-essentials-backend/commit/5c6c19fb70b9f77bb09849157778d4f8f1264440))


### Bug Fixes

* If an error occurs while editing or uploading a product, newly uploaded images are deleted ([b70f548](https://github.com/AscentEssentials/ascent-essentials-backend/commit/b70f548f8ce71554426d8a2fc3cad8a7fa4cd184))
* Revert If an error occurs while editing or uploading a product, newly uploaded images are deleted ([702f642](https://github.com/AscentEssentials/ascent-essentials-backend/commit/702f642e375013e92d8e6ee60d7aa054ad94820e))


### Style improvements

* move post "/product" route to the top of swagger ([04f3950](https://github.com/AscentEssentials/ascent-essentials-backend/commit/04f395005e08c1bd59c710f2d39b1fd5d26df038))
* reformat indent ([9d4fb6b](https://github.com/AscentEssentials/ascent-essentials-backend/commit/9d4fb6b88281292b1768811130fcb0baf8007747))

## [3.0.0](https://github.com/AscentEssentials/ascent-essentials-backend/compare/2.0.0...3.0.0) (2024-01-03)


### ⚠ BREAKING CHANGES

* provide route to edit a subcategory
* in product, reference to subcategory instead of category
* provide subcategory routes

### Features

* add subCategory controller ([ef50df5](https://github.com/AscentEssentials/ascent-essentials-backend/commit/ef50df59527de7284fd979640d710e042e0a0128))
* add subCategory model ([b9edc12](https://github.com/AscentEssentials/ascent-essentials-backend/commit/b9edc12aaf9a60287bd218ea57e7e886b09fc3cd))
* defined subcategory routes ([2b22f7c](https://github.com/AscentEssentials/ascent-essentials-backend/commit/2b22f7cec5f01fbf9802f658da8b9b3f53de1946))
* in product, reference to subcategory instead of category ([3efe6cc](https://github.com/AscentEssentials/ascent-essentials-backend/commit/3efe6ccc88001d4a64b8ee88a961f2b6d437bdf0))
* provide route to edit a subcategory ([605a121](https://github.com/AscentEssentials/ascent-essentials-backend/commit/605a121cd79819d47fd84f782a50d19241cdcf20))
* provide subcategory routes ([b1331ba](https://github.com/AscentEssentials/ascent-essentials-backend/commit/b1331bac0bc7ae2727295acd89d35655107d7273))


### Bug Fixes

* description in the subcategory schema ([aad6555](https://github.com/AscentEssentials/ascent-essentials-backend/commit/aad65556507dc28a060c3608d13c415d2a3c3f49))


### Documentation

* update swagger categories tag description to include subcategory ([59557cd](https://github.com/AscentEssentials/ascent-essentials-backend/commit/59557cdb2746ed7a7896d79cb6bd67a6384dd15d))

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
