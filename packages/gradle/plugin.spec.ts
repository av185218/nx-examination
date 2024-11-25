import { CreateNodesContext, readJsonFile } from '@nx/devkit';
import { TempFs } from '@nx/devkit/internal-testing-utils';
import { createNodesV2 } from './plugin';
import { type NodesReport } from './src/plugin/utils/get-nodes-from-gradle-plugin';
import { join } from 'path';

let gradleReport: NodesReport;
jest.mock('./src/plugin/utils/get-nodes-from-gradle-plugin', () => {
  return {
    GRADLE_BUILD_FILES: new Set(['build.gradle', 'build.gradle.kts']),
    populateNodes: jest.fn().mockImplementation(() => void 0),
    getCurrentNodesReport: jest.fn().mockImplementation(() => gradleReport),
  };
});

describe('@nx/gradle/plugin', () => {
  let createNodesFunction = createNodesV2[1];
  let context: CreateNodesContext;
  let tempFs: TempFs;

  beforeEach(async () => {
    tempFs = new TempFs('gradle-plugin');
    gradleReport = readJsonFile(
      join(__dirname, 'src/plugin/utils/__mocks__/gradle_tutorial.json')
    );
    context = {
      nxJsonConfiguration: {
        namedInputs: {
          default: ['{projectRoot}/**/*'],
          production: ['!{projectRoot}/**/*.spec.ts'],
        },
      },
      workspaceRoot: tempFs.tempDir,
      configFiles: [],
    };
    tempFs.createFileSync('package.json', JSON.stringify({ name: 'repo' }));
    tempFs.createFileSync(
      'my-app/project.json',
      JSON.stringify({ name: 'my-app' })
    );
  });

  afterEach(() => {
    jest.resetModules();
    tempFs.cleanup();
    tempFs = null;
  });

  it('should create nodes', async () => {
    tempFs.createFileSync('gradlew', '');

    const nodes = await createNodesFunction(
      ['gradlew', 'proj/build.gradle'],
      undefined,
      context
    );

    expect(nodes).toMatchInlineSnapshot(`
      [
        [
          "proj/build.gradle",
          {
            "projects": {
              "proj": {
                "metadata": {
                  "targetGroups": {
                    "Build Setup": [
                      "init",
                      "updateDaemonJvm",
                      "wrapper",
                    ],
                    "Nx Custom": [
                      "createNodes",
                    ],
                    "help": [
                      "buildEnvironment",
                      "dependencies",
                      "dependencyInsight",
                      "help",
                      "javaToolchains",
                      "outgoingVariants",
                      "projects",
                      "properties",
                      "resolvableConfigurations",
                      "tasks",
                    ],
                    "reporting": [
                      "projectReport",
                    ],
                  },
                  "technologies": [
                    "Gradle",
                  ],
                },
                "name": "gradle-tutorial",
                "root": "proj",
                "targets": {
                  "buildEnvironment": {
                    "cache": true,
                    "command": "./gradlew :buildEnvironment",
                    "metadata": {
                      "description": "Displays all buildscript dependencies declared in root project 'gradle-tutorial'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "components": {
                    "cache": true,
                    "command": "./gradlew :components",
                    "metadata": {
                      "description": "Displays the components produced by root project 'gradle-tutorial'. [deprecated]",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "createNodes": {
                    "cache": true,
                    "command": "./gradlew :createNodes",
                    "metadata": {
                      "description": "Create nodes and dependencies for Nx",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "dependencies": {
                    "cache": true,
                    "command": "./gradlew :dependencies",
                    "metadata": {
                      "description": "Displays all dependencies declared in root project 'gradle-tutorial'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "dependencyInsight": {
                    "cache": true,
                    "command": "./gradlew :dependencyInsight",
                    "metadata": {
                      "description": "Displays the insight into a specific dependency in root project 'gradle-tutorial'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "dependencyReport": {
                    "cache": true,
                    "command": "./gradlew :dependencyReport",
                    "metadata": {
                      "description": "Generates a report about your library dependencies.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/reports/project/dependencies.txt",
                    ],
                  },
                  "dependentComponents": {
                    "cache": true,
                    "command": "./gradlew :dependentComponents",
                    "metadata": {
                      "description": "Displays the dependent components of components in root project 'gradle-tutorial'. [deprecated]",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "help": {
                    "cache": true,
                    "command": "./gradlew :help",
                    "metadata": {
                      "description": "Displays a help message.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "htmlDependencyReport": {
                    "cache": true,
                    "command": "./gradlew :htmlDependencyReport",
                    "metadata": {
                      "description": "Generates an HTML report about your library dependencies.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/reports/project/dependencies",
                    ],
                  },
                  "init": {
                    "cache": true,
                    "command": "./gradlew :init",
                    "metadata": {
                      "description": "Initializes a new Gradle build.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "javaToolchains": {
                    "cache": true,
                    "command": "./gradlew :javaToolchains",
                    "metadata": {
                      "description": "Displays the detected java toolchains.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "model": {
                    "cache": true,
                    "command": "./gradlew :model",
                    "metadata": {
                      "description": "Displays the configuration model of root project 'gradle-tutorial'. [deprecated]",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "outgoingVariants": {
                    "cache": true,
                    "command": "./gradlew :outgoingVariants",
                    "metadata": {
                      "description": "Displays the outgoing variants of root project 'gradle-tutorial'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "prepareKotlinBuildScriptModel": {
                    "cache": true,
                    "command": "./gradlew :prepareKotlinBuildScriptModel",
                    "metadata": {
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "projectReport": {
                    "cache": true,
                    "command": "./gradlew :projectReport",
                    "dependsOn": [
                      "gradle-tutorial:taskReport",
                      "gradle-tutorial:dependencyReport",
                      "gradle-tutorial:propertyReport",
                      "gradle-tutorial:htmlDependencyReport",
                    ],
                    "metadata": {
                      "description": "Generates a report about your project.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "projectReportAll": {
                    "cache": true,
                    "command": "./gradlew :projectReportAll",
                    "dependsOn": [
                      "library:projectReport",
                      "application3:projectReport",
                      "application2:projectReport",
                      "application:projectReport",
                      "gradle-tutorial:projectReport",
                    ],
                    "metadata": {
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "projects": {
                    "cache": true,
                    "command": "./gradlew :projects",
                    "metadata": {
                      "description": "Displays the sub-projects of root project 'gradle-tutorial'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "properties": {
                    "cache": true,
                    "command": "./gradlew :properties",
                    "metadata": {
                      "description": "Displays the properties of root project 'gradle-tutorial'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "propertyReport": {
                    "cache": true,
                    "command": "./gradlew :propertyReport",
                    "metadata": {
                      "description": "Generates a report about your properties.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/reports/project/properties.txt",
                    ],
                  },
                  "resolvableConfigurations": {
                    "cache": true,
                    "command": "./gradlew :resolvableConfigurations",
                    "metadata": {
                      "description": "Displays the configurations that can be resolved in root project 'gradle-tutorial'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "taskReport": {
                    "cache": true,
                    "command": "./gradlew :taskReport",
                    "metadata": {
                      "description": "Generates a report about your tasks.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/reports/project/tasks.txt",
                    ],
                  },
                  "tasks": {
                    "cache": true,
                    "command": "./gradlew :tasks",
                    "metadata": {
                      "description": "Displays the tasks runnable from root project 'gradle-tutorial' (some of the displayed tasks may belong to subprojects).",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "updateDaemonJvm": {
                    "cache": true,
                    "command": "./gradlew :updateDaemonJvm",
                    "metadata": {
                      "description": "Generates or updates the Gradle Daemon JVM criteria.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/gradle/gradle-daemon-jvm.properties",
                    ],
                  },
                  "wrapper": {
                    "cache": true,
                    "command": "./gradlew :wrapper",
                    "metadata": {
                      "description": "Generates Gradle wrapper files.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/gradlew.bat",
                      "{projectRoot}/gradle/wrapper/gradle-wrapper.jar",
                      "{projectRoot}/gradle/wrapper/gradle-wrapper.properties",
                      "{projectRoot}/gradlew",
                    ],
                  },
                },
              },
            },
          },
        ],
      ]
    `);
  });
});
