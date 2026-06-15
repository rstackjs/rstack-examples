# Rstack Examples

This repository contains comprehensive examples that demonstrate the Rstack ecosystem tools, including Rspack, Rsbuild, Rspress, and Rsdoctor. These examples showcase common implementation patterns and best practices to help developers leverage the full potential of the Rstack toolchain.

> The `main` branch contains examples for Rspack/Rsbuild v2. For Rspack/Rsbuild 1.x examples, please check the [v1.x](https://github.com/rstackjs/rstack-examples/tree/v1.x) branch.

## List of Examples

|   [Rspack](https://github.com/web-infra-dev/rspack)   |    <a href="https://github.com/web-infra-dev/rspack" target="blank"><img src="https://assets.rspack.rs/rspack/rspack-banner.png" width="400" /></a>    |  [Examples](./rspack)   |  [Document](https://rspack.rs/)  |
| :---------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------: | :------------------------------: |
|  [Rsbuild](https://github.com/web-infra-dev/rsbuild)  |  <a href="https://github.com/web-infra-dev/rsbuild" target="blank"><img src="https://assets.rspack.rs/rsbuild/rsbuild-banner.png" width="400" /></a>   |  [Examples](./rsbuild)  | [Document](https://rsbuild.rs/)  |
|  [Rspress](https://github.com/web-infra-dev/rspress)  |  <a href="https://github.com/web-infra-dev/rspress" target="blank"><img src="https://assets.rspack.rs/rspress/rspress-banner.png" width="400" /></a>   | [Examples](./rspress/)  | [Document](https://rspress.rs/)  |
| [Rsdoctor](https://github.com/web-infra-dev/rsdoctor) | <a href="https://github.com/web-infra-dev/rsdoctor" target="blank"><img src="https://assets.rspack.rs/rsdoctor/rsdoctor-banner.png" width="400" /></a> | [Examples](./rsdoctor/) | [Document](https://rsdoctor.rs/) |
|    [Rslib](https://github.com/web-infra-dev/rslib)    |     <a href="https://github.com/web-infra-dev/rslib" target="blank"><img src="https://assets.rspack.rs/rslib/rslib-banner.png" width="400" /></a>      |   [Examples](./rslib)   |  [Document](https://rslib.rs/)   |

## How to Use

### Clone single example

To clone a single example, use [giget](https://github.com/unjs/giget) to download a sub-directory from the current repository.

For example, to clone the `/rspack/basic` example, run the following command:

```bash
# Clone the basic example
npx giget gh:rstackjs/rstack-examples/rspack/basic my-app

# Enter the my-app example directory
cd my-app

# Install the dependencies
pnpm i
```

The second argument is the output directory. Pass it explicitly so the example is
created with a clear local folder name.

You can clone any other example by replacing the path and output directory:

```bash
# Clone the Rsbuild React example
npx giget gh:rstackjs/rstack-examples/rsbuild/react my-app

# Clone the Rslib React example
npx giget gh:rstackjs/rstack-examples/rslib/react-basic my-lib
```

### Clone all examples

To try all examples, you can clone the current repository to your local.

1. First, clone the current repository to your local:

```bash
git clone git@github.com:rstackjs/rstack-examples.git
```

2. Then, choose the example you need, such as the Rsbuild react example:

```bash
cd rsbuild/react
```

3. Install the dependencies using `pnpm` or other package manager, then start the project:

```bash
# Use corepack to enable pnpm
corepack enable
pnpm i
pnpm run dev
```

4. You can fork the current project or copy the code from the current project to use it.
