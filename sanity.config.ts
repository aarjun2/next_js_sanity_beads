import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import {visionTool} from '@sanity/vision'
import schemas from "./sanity/schemas";

const config = defineConfig({
    projectId: 'kssnf3nz',
    dataset: 'production',
    basePath: '/admin',
    plugins: [deskTool(), visionTool()],
    schema: {types: schemas},
})

export default config;