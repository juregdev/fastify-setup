import { FastifyInstance } from 'fastify';
import { readdirSync, statSync, existsSync } from 'fs';
import { join, parse, resolve } from 'path';

function getAllFilesPaths(dirPath: string, arrayOfFiles?: string[]): string[] {
  if (!existsSync(dirPath)) {
    return [];
  }

  const files = readdirSync(dirPath);

  const newArrayOfFiles = arrayOfFiles || [];

  files.forEach((fileName) => {
    const localDir = join(dirPath, fileName);

    if (statSync(localDir).isDirectory()) {
      const directoryFiles = getAllFilesPaths(localDir, arrayOfFiles);
      newArrayOfFiles.push(...directoryFiles);
      return;
    }

    newArrayOfFiles.push(localDir);
  });

  return newArrayOfFiles;
}

export default async function defineRoutes(app: FastifyInstance, pathToControllerAsArray: string[][]): Promise<void> {
  const basePath = pathToControllerAsArray.map((p) => join(...p));

  const promises = basePath
    .map((p) =>
      getAllFilesPaths(p)
        .filter((filePath) => {
          const fileName = parse(filePath).base;
          return filePath.indexOf('.') !== 0 && (fileName === 'routes.ts' || fileName === 'routes.js');
        })
        .map(async (filePath) => {
          const modulePath = resolve(p, filePath);
          const routeModule = (await import(modulePath)).default;
          app.register(routeModule.router, { prefix: routeModule.basePath });
        }),
    )
    .flat();

  await Promise.all(promises);
}
