This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Demo URL - https://d37ss5gyn2yyzo.cloudfront.net


# This is how I built this project

- Create AWS Account and create IAM access key and secret Key. Attach AmplifyAdmin Role, this allows amplify cli to work without any issues.

- [setup aws cli on the computer](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [setup nodejs 16](https://nodejs.org/en/blog/release/v16.16.0)
- setup aws credentials by running `aws configure` on a terminal
- create a new nextjs project using `npx create-next-app@latest aws-image-uploader-app --no-app`
- open the project in vs code `code aws-image-uploader-app`
- install amplify cli with `npm install -g @aws-amplify/cli` using vscode terminal
- run `amplify init` to setup the project to use aws amplify and allows nextjs app to connect to aws securely.
- all defaults selection on above
- run `npm install aws-amplify @aws-amplify/ui-react` to install [Amplify UI library](https://ui.docs.amplify.aws/), this allows us to not spend time in CSS.
- run `amplify add auth` (use all option 1. default setup and use email as login attribute)
- run `amplify push` to allow amplify to create a cognito user pool for logging into the application.
- wrap application with [Authenticator component](https://ui.docs.amplify.aws/react/connected-components/authenticator) of amplify-ui-library.
- test the application with `npm run dev`
- open [pages/index.tsx](pages/index.tsx) and start editing to add [Storage](https://ui.docs.amplify.aws/react/connected-components/storage) to allow access to s3.
- add the [file uploader](https://ui.docs.amplify.aws/react/connected-components/storage/fileuploader) to allow user to upload files to s3.
- create a uploader function and list function to get the list of uploaded images.
- add [storage image](https://ui.docs.amplify.aws/react/connected-components/storage/storageimage) component to allow preview.
- add delete button logic to allow removing images.
