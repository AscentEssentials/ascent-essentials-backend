{
	pkgs ? import <nixpkgs> {}
}:

(
	pkgs.buildFHSUserEnv
	{
		name = "WebStorm with NodeJS";
		targetPkgs = pkgs:
		[
			pkgs.jetbrains.webstorm
			pkgs.nodejs_20
			pkgs.sass
		];
	}
).env
