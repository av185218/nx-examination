import { CreateNodesContext, readJsonFile } from '@nx/devkit';
import { join } from 'path';
import { TempFs } from 'nx/src/internal-testing-utils/temp-fs';
import { type NodesReport } from './utils/get-nodes-from-gradle-plugin';

let gradleReport: NodesReport;
jest.mock('./utils/get-nodes-from-gradle-plugin', () => {
  return {
    GRADLE_BUILD_FILES: new Set(['build.gradle', 'build.gradle.kts']),
    populateNodes: jest.fn().mockImplementation(() => void 0),
    getCurrentNodesReport: jest.fn().mockImplementation(() => gradleReport),
  };
});

import { createNodesV2 } from './nodes';

describe('@nx/gradle/plugin/nodes', () => {
  let createNodesFunction = createNodesV2[1];
  let context: CreateNodesContext;
  let tempFs: TempFs;
  let cwd: string;

  beforeEach(async () => {
    tempFs = new TempFs('test');
    gradleReport = readJsonFile(
      join(__dirname, 'utils/__mocks__/gradle_tutorial.json')
    );
    cwd = process.cwd();
    process.chdir(tempFs.tempDir);
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

    await tempFs.createFiles({
      'proj/build.gradle': ``,
      gradlew: '',
    });
  });

  afterEach(() => {
    jest.resetModules();
    process.chdir(cwd);
  });

  it('should create nodes based on gradle', async () => {
    const results = await createNodesFunction(
      ['proj/build.gradle'],
      {
        buildTargetName: 'build',
      },
      context
    );

    expect(results).toMatchInlineSnapshot(`
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

  it('should create nodes based on gradle for nested project root', async () => {
    gradleReport = readJsonFile(
      join(__dirname, '/utils/__mocks__/gradle_composite.json')
    );
    await tempFs.createFiles({
      'nested/nested/proj/build.gradle': ``,
    });

    const results = await createNodesFunction(
      ['nested/nested/proj/build.gradle'],
      {
        buildTargetName: 'build',
      },
      context
    );

    expect(results).toMatchInlineSnapshot(`
      [
        [
          "nested/nested/proj/build.gradle",
          {
            "projects": {
              "nested/nested/proj": {
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
                      "kotlinDslAccessorsReport",
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
                "name": "my-composite",
                "root": "nested/nested/proj",
                "targets": {
                  "buildEnvironment": {
                    "cache": true,
                    "command": "./gradlew :buildEnvironment",
                    "metadata": {
                      "description": "Displays all buildscript dependencies declared in root project 'my-composite'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "nested/nested/proj",
                    },
                  },
                  "checkAll": {
                    "cache": true,
                    "command": "./gradlew :checkAll",
                    "dependsOn": [
                      "string-utils:check",
                      "number-utils:check",
                      "app:check",
                    ],
                    "metadata": {
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "nested/nested/proj",
                    },
                  },
                  "components": {
                    "cache": true,
                    "command": "./gradlew :components",
                    "metadata": {
                      "description": "Displays the components produced by root project 'my-composite'. [deprecated]",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "nested/nested/proj",
                    },
                  },
                  "createNodes": {
                    "cache": true,
                    "command": "./gradlew :createNodes",
                    "dependsOn": [
                      "my-utils:createNodes",
                      "my-app:createNodes",
                    ],
                    "metadata": {
                      "description": "Create nodes and dependencies for Nx",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "nested/nested/proj",
                    },
                  },
                  "dependencies": {
                    "cache": true,
                    "command": "./gradlew :dependencies",
                    "metadata": {
                      "description": "Displays all dependencies declared in root project 'my-composite'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "nested/nested/proj",
                    },
                  },
                  "dependencyInsight": {
                    "cache": true,
                    "command": "./gradlew :dependencyInsight",
                    "metadata": {
                      "description": "Displays the insight into a specific dependency in root project 'my-composite'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "nested/nested/proj",
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
                      "cwd": "nested/nested/proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/reports/project/dependencies.txt",
                    ],
                  },
                  "dependentComponents": {
                    "cache": true,
                    "command": "./gradlew :dependentComponents",
                    "metadata": {
                      "description": "Displays the dependent components of components in root project 'my-composite'. [deprecated]",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "nested/nested/proj",
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
                      "cwd": "nested/nested/proj",
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
                      "cwd": "nested/nested/proj",
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
                      "cwd": "nested/nested/proj",
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
                      "cwd": "nested/nested/proj",
                    },
                  },
                  "kotlinDslAccessorsReport": {
                    "cache": true,
                    "command": "./gradlew :kotlinDslAccessorsReport",
                    "metadata": {
                      "description": "Prints the Kotlin code for accessing the currently available project extensions and conventions.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "nested/nested/proj",
                    },
                  },
                  "model": {
                    "cache": true,
                    "command": "./gradlew :model",
                    "metadata": {
                      "description": "Displays the configuration model of root project 'my-composite'. [deprecated]",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "nested/nested/proj",
                    },
                  },
                  "outgoingVariants": {
                    "cache": true,
                    "command": "./gradlew :outgoingVariants",
                    "metadata": {
                      "description": "Displays the outgoing variants of root project 'my-composite'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "nested/nested/proj",
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
                      "cwd": "nested/nested/proj",
                    },
                  },
                  "projectReport": {
                    "cache": true,
                    "command": "./gradlew :projectReport",
                    "dependsOn": [
                      "my-composite:taskReport",
                      "my-composite:dependencyReport",
                      "my-composite:propertyReport",
                      "my-composite:htmlDependencyReport",
                    ],
                    "metadata": {
                      "description": "Generates a report about your project.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "nested/nested/proj",
                    },
                  },
                  "projectReportAll": {
                    "cache": true,
                    "command": "./gradlew :projectReportAll",
                    "dependsOn": [
                      "my-composite:projectReport",
                      "my-utils:projectReportAll",
                      "my-app:projectReportAll",
                    ],
                    "metadata": {
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "nested/nested/proj",
                    },
                  },
                  "projects": {
                    "cache": true,
                    "command": "./gradlew :projects",
                    "metadata": {
                      "description": "Displays the sub-projects of root project 'my-composite'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "nested/nested/proj",
                    },
                  },
                  "properties": {
                    "cache": true,
                    "command": "./gradlew :properties",
                    "metadata": {
                      "description": "Displays the properties of root project 'my-composite'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "nested/nested/proj",
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
                      "cwd": "nested/nested/proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/reports/project/properties.txt",
                    ],
                  },
                  "resolvableConfigurations": {
                    "cache": true,
                    "command": "./gradlew :resolvableConfigurations",
                    "metadata": {
                      "description": "Displays the configurations that can be resolved in root project 'my-composite'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "nested/nested/proj",
                    },
                  },
                  "run": {
                    "cache": true,
                    "command": "./gradlew :run",
                    "dependsOn": [
                      "app:run",
                    ],
                    "metadata": {
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "nested/nested/proj",
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
                      "cwd": "nested/nested/proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/reports/project/tasks.txt",
                    ],
                  },
                  "tasks": {
                    "cache": true,
                    "command": "./gradlew :tasks",
                    "metadata": {
                      "description": "Displays the tasks runnable from root project 'my-composite'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "nested/nested/proj",
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
                      "cwd": "nested/nested/proj",
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
                      "cwd": "nested/nested/proj",
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

  it('should create nodes with atomized tests targets based on gradle for nested project root', async () => {
    const results = await createNodesFunction(
      ['proj/application/build.gradle'],
      {
        buildTargetName: 'build',
        ciTargetName: 'test-ci',
      },
      context
    );

    expect(results).toMatchInlineSnapshot(`
      [
        [
          "proj/application/build.gradle",
          {
            "projects": {
              "proj/application": {
                "metadata": {
                  "targetGroups": {
                    "application": [
                      "bootRun",
                      "bootTestRun",
                    ],
                    "build": [
                      "assemble",
                      "bootBuildImage",
                      "bootJar",
                      "build",
                      "buildDependents",
                      "buildNeeded",
                      "classes",
                      "clean",
                      "jar",
                      "resolveMainClassName",
                      "resolveTestMainClassName",
                      "testClasses",
                    ],
                    "documentation": [
                      "javadoc",
                    ],
                    "help": [
                      "buildEnvironment",
                      "dependencies",
                      "dependencyInsight",
                      "dependencyManagement",
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
                    "verification": [
                      "check",
                      "test-ci",
                      "test",
                    ],
                  },
                  "technologies": [
                    "Gradle",
                  ],
                },
                "name": "application",
                "root": "proj/application",
                "targets": {
                  "assemble": {
                    "cache": true,
                    "command": "./gradlew :application:assemble",
                    "dependsOn": [
                      "application:bootJar",
                      "application:jar",
                    ],
                    "metadata": {
                      "description": "Assembles the outputs of this project.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "bootBuildImage": {
                    "cache": true,
                    "command": "./gradlew :application:bootBuildImage",
                    "dependsOn": [
                      "application:bootJar",
                    ],
                    "metadata": {
                      "description": "Builds an OCI image of the application using the output of the bootJar task",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "bootJar": {
                    "cache": true,
                    "command": "./gradlew :application:bootJar",
                    "dependsOn": [
                      "application:classes",
                      "application:compileJava",
                      "library:jar",
                      "application:resolveMainClassName",
                    ],
                    "inputs": [
                      "{projectRoot}/build/tmp/bootJar/MANIFEST.MF",
                      "{projectRoot}/build/classes/java/main/com/example/multimodule/application/DemoApplication.class",
                      "{projectRoot}/build/resources/main/application.properties",
                      "{workspaceRoot}/library/build/libs/library-0.0.1-SNAPSHOT.jar",
                    ],
                    "metadata": {
                      "description": "Assembles an executable jar archive containing the main classes and their dependencies.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/libs/application-0.0.1-SNAPSHOT.jar",
                    ],
                  },
                  "bootRun": {
                    "cache": true,
                    "command": "./gradlew :application:bootRun",
                    "dependsOn": [
                      "application:classes",
                      "application:compileJava",
                      "library:jar",
                      "application:resolveMainClassName",
                    ],
                    "metadata": {
                      "description": "Runs this project as a Spring Boot application.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "bootTestRun": {
                    "cache": true,
                    "command": "./gradlew :application:bootTestRun",
                    "dependsOn": [
                      "application:testClasses",
                      "application:compileTestJava",
                      "application:classes",
                      "application:compileJava",
                      "library:jar",
                      "application:resolveTestMainClassName",
                    ],
                    "metadata": {
                      "description": "Runs this project as a Spring Boot application using the test runtime classpath.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "build": {
                    "cache": true,
                    "command": "./gradlew :application:build",
                    "dependsOn": [
                      "application:check",
                      "application:assemble",
                    ],
                    "metadata": {
                      "description": "Assembles and tests this project.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "buildDependents": {
                    "cache": true,
                    "command": "./gradlew :application:buildDependents",
                    "dependsOn": [
                      "application:build",
                    ],
                    "metadata": {
                      "description": "Assembles and tests this project and all projects that depend on it.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "buildEnvironment": {
                    "cache": true,
                    "command": "./gradlew :application:buildEnvironment",
                    "metadata": {
                      "description": "Displays all buildscript dependencies declared in project ':application'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "buildNeeded": {
                    "cache": true,
                    "command": "./gradlew :application:buildNeeded",
                    "dependsOn": [
                      "application:build",
                      "library:buildNeeded",
                    ],
                    "metadata": {
                      "description": "Assembles and tests this project and all projects it depends on.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "check": {
                    "cache": true,
                    "command": "./gradlew :application:check",
                    "dependsOn": [
                      "application:test",
                    ],
                    "metadata": {
                      "description": "Runs all checks.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "classes": {
                    "cache": true,
                    "command": "./gradlew :application:classes",
                    "dependsOn": [
                      "application:compileJava",
                      "application:processResources",
                    ],
                    "metadata": {
                      "description": "Assembles main classes.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "clean": {
                    "cache": true,
                    "command": "./gradlew :application:clean",
                    "metadata": {
                      "description": "Deletes the build directory.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "compileJava": {
                    "cache": true,
                    "command": "./gradlew :application:compileJava",
                    "dependsOn": [
                      "library:jar",
                    ],
                    "inputs": [
                      "{projectRoot}/src/main/java/com/example/multimodule/application/DemoApplication.java",
                    ],
                    "metadata": {
                      "description": "Compiles main Java source.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/classes/java/main",
                      "{projectRoot}/build/generated/sources/annotationProcessor/java/main",
                      "{projectRoot}/build/generated/sources/headers/java/main",
                      "{projectRoot}/build/tmp/compileJava/previous-compilation-data.bin",
                    ],
                  },
                  "compileTestJava": {
                    "cache": true,
                    "command": "./gradlew :application:compileTestJava",
                    "dependsOn": [
                      "application:classes",
                      "application:compileJava",
                      "library:jar",
                    ],
                    "inputs": [
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest10.java",
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest7.java",
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest6.java",
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest3.java",
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest2.java",
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest9.java",
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest.java",
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest5.java",
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest4.java",
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest8.java",
                    ],
                    "metadata": {
                      "description": "Compiles test Java source.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/classes/java/test",
                      "{projectRoot}/build/generated/sources/annotationProcessor/java/test",
                      "{projectRoot}/build/generated/sources/headers/java/test",
                      "{projectRoot}/build/tmp/compileTestJava/previous-compilation-data.bin",
                    ],
                  },
                  "components": {
                    "cache": true,
                    "command": "./gradlew :application:components",
                    "metadata": {
                      "description": "Displays the components produced by project ':application'. [deprecated]",
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
                    "command": "./gradlew :application:dependencies",
                    "metadata": {
                      "description": "Displays all dependencies declared in project ':application'.",
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
                    "command": "./gradlew :application:dependencyInsight",
                    "metadata": {
                      "description": "Displays the insight into a specific dependency in project ':application'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "dependencyManagement": {
                    "cache": true,
                    "command": "./gradlew :application:dependencyManagement",
                    "metadata": {
                      "description": "Displays the dependency management declared in project ':application'.",
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
                    "command": "./gradlew :application:dependencyReport",
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
                    "command": "./gradlew :application:dependentComponents",
                    "metadata": {
                      "description": "Displays the dependent components of components in project ':application'. [deprecated]",
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
                    "command": "./gradlew :application:help",
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
                    "command": "./gradlew :application:htmlDependencyReport",
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
                  "jar": {
                    "cache": true,
                    "command": "./gradlew :application:jar",
                    "dependsOn": [
                      "application:classes",
                      "application:compileJava",
                    ],
                    "inputs": [
                      "{projectRoot}/build/classes/java/main/com/example/multimodule/application/DemoApplication.class",
                      "{projectRoot}/build/resources/main/application.properties",
                      "{projectRoot}/build/tmp/jar/MANIFEST.MF",
                    ],
                    "metadata": {
                      "description": "Assembles a jar archive containing the classes of the 'main' feature.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/libs/application-0.0.1-SNAPSHOT-plain.jar",
                    ],
                  },
                  "javaToolchains": {
                    "cache": true,
                    "command": "./gradlew :application:javaToolchains",
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
                  "javadoc": {
                    "cache": true,
                    "command": "./gradlew :application:javadoc",
                    "dependsOn": [
                      "application:classes",
                      "application:compileJava",
                      "library:jar",
                    ],
                    "inputs": [
                      "{projectRoot}/src/main/java/com/example/multimodule/application/DemoApplication.java",
                    ],
                    "metadata": {
                      "description": "Generates Javadoc API documentation for the 'main' feature.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/docs/javadoc",
                    ],
                  },
                  "model": {
                    "cache": true,
                    "command": "./gradlew :application:model",
                    "metadata": {
                      "description": "Displays the configuration model of project ':application'. [deprecated]",
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
                    "command": "./gradlew :application:outgoingVariants",
                    "metadata": {
                      "description": "Displays the outgoing variants of project ':application'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "processResources": {
                    "cache": true,
                    "command": "./gradlew :application:processResources",
                    "inputs": [
                      "{projectRoot}/src/main/resources/application.properties",
                    ],
                    "metadata": {
                      "description": "Processes main resources.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/resources/main",
                    ],
                  },
                  "processTestResources": {
                    "cache": true,
                    "command": "./gradlew :application:processTestResources",
                    "metadata": {
                      "description": "Processes test resources.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/resources/test",
                    ],
                  },
                  "projectReport": {
                    "cache": true,
                    "command": "./gradlew :application:projectReport",
                    "dependsOn": [
                      "application:taskReport",
                      "application:dependencyReport",
                      "application:propertyReport",
                      "application:htmlDependencyReport",
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
                    "command": "./gradlew :application:projectReportAll",
                    "dependsOn": [
                      "application:projectReport",
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
                    "command": "./gradlew :application:projects",
                    "metadata": {
                      "description": "Displays the sub-projects of project ':application'.",
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
                    "command": "./gradlew :application:properties",
                    "metadata": {
                      "description": "Displays the properties of project ':application'.",
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
                    "command": "./gradlew :application:propertyReport",
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
                    "command": "./gradlew :application:resolvableConfigurations",
                    "metadata": {
                      "description": "Displays the configurations that can be resolved in project ':application'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "resolveMainClassName": {
                    "cache": true,
                    "command": "./gradlew :application:resolveMainClassName",
                    "dependsOn": [
                      "application:classes",
                      "application:compileJava",
                    ],
                    "metadata": {
                      "description": "Resolves the name of the application's main class.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/resolvedMainClassName",
                    ],
                  },
                  "resolveTestMainClassName": {
                    "cache": true,
                    "command": "./gradlew :application:resolveTestMainClassName",
                    "dependsOn": [
                      "application:testClasses",
                      "application:compileTestJava",
                      "application:classes",
                      "application:compileJava",
                    ],
                    "metadata": {
                      "description": "Resolves the name of the application's test main class.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/resolvedMainTestClassName",
                    ],
                  },
                  "taskReport": {
                    "cache": true,
                    "command": "./gradlew :application:taskReport",
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
                    "command": "./gradlew :application:tasks",
                    "metadata": {
                      "description": "Displays the tasks runnable from project ':application'.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                  },
                  "test": {
                    "cache": true,
                    "command": "./gradlew :application:test",
                    "dependsOn": [
                      "application:compileTestJava",
                      "application:testClasses",
                      "application:classes",
                      "application:compileJava",
                      "library:jar",
                    ],
                    "inputs": [
                      "{projectRoot}/build/classes/java/test/com/example/multimodule/application/DemoApplicationTest9.class",
                      "{projectRoot}/build/classes/java/test/com/example/multimodule/application/DemoApplicationTest8.class",
                      "{projectRoot}/build/classes/java/test/com/example/multimodule/application/DemoApplicationTest10.class",
                      "{projectRoot}/build/classes/java/test/com/example/multimodule/application/DemoApplicationTest2.class",
                      "{projectRoot}/build/classes/java/test/com/example/multimodule/application/DemoApplicationTest6.class",
                      "{projectRoot}/build/classes/java/test/com/example/multimodule/application/DemoApplicationTest4.class",
                      "{projectRoot}/build/classes/java/test/com/example/multimodule/application/DemoApplicationTest.class",
                      "{projectRoot}/build/classes/java/test/com/example/multimodule/application/DemoApplicationTest3.class",
                      "{projectRoot}/build/classes/java/test/com/example/multimodule/application/DemoApplicationTest5.class",
                      "{projectRoot}/build/classes/java/test/com/example/multimodule/application/DemoApplicationTest7.class",
                    ],
                    "metadata": {
                      "description": "Runs the test suite.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/test-results/test/binary",
                      "{projectRoot}/build/reports/tests/test",
                      "{projectRoot}/build/test-results/test",
                    ],
                  },
                  "test-ci": {
                    "cache": true,
                    "dependsOn": [
                      {
                        "params": "forward",
                        "projects": "self",
                        "target": "test-ci--DemoApplicationTest10",
                      },
                      {
                        "params": "forward",
                        "projects": "self",
                        "target": "test-ci--DemoApplicationTest7",
                      },
                      {
                        "params": "forward",
                        "projects": "self",
                        "target": "test-ci--DemoApplicationTest6",
                      },
                      {
                        "params": "forward",
                        "projects": "self",
                        "target": "test-ci--DemoApplicationTest3",
                      },
                      {
                        "params": "forward",
                        "projects": "self",
                        "target": "test-ci--DemoApplicationTest2",
                      },
                      {
                        "params": "forward",
                        "projects": "self",
                        "target": "test-ci--DemoApplicationTest9",
                      },
                      {
                        "params": "forward",
                        "projects": "self",
                        "target": "test-ci--DemoApplicationTest",
                      },
                      {
                        "params": "forward",
                        "projects": "self",
                        "target": "test-ci--DemoApplicationTest5",
                      },
                      {
                        "params": "forward",
                        "projects": "self",
                        "target": "test-ci--DemoApplicationTest4",
                      },
                      {
                        "params": "forward",
                        "projects": "self",
                        "target": "test-ci--DemoApplicationTest8",
                      },
                    ],
                    "executor": "nx:noop",
                    "inputs": [
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest10.java",
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest7.java",
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest6.java",
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest3.java",
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest2.java",
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest9.java",
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest.java",
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest5.java",
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest4.java",
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest8.java",
                    ],
                    "metadata": {
                      "description": "Runs Gradle Tests in CI",
                      "nonAtomizedTarget": "test",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/classes/java/test",
                      "{projectRoot}/build/generated/sources/annotationProcessor/java/test",
                      "{projectRoot}/build/generated/sources/headers/java/test",
                      "{projectRoot}/build/tmp/compileTestJava/previous-compilation-data.bin",
                    ],
                  },
                  "test-ci--DemoApplicationTest": {
                    "cache": true,
                    "command": "./gradlew :application:test --tests DemoApplicationTest",
                    "dependsOn": [
                      "application:classes",
                      "application:compileJava",
                      "library:jar",
                    ],
                    "inputs": [
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest.java",
                    ],
                    "metadata": {
                      "description": "Runs Gradle test proj/application/src/test/java/com/example/multimodule/application/DemoApplicationTest.java in CI",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/classes/java/test",
                      "{projectRoot}/build/generated/sources/annotationProcessor/java/test",
                      "{projectRoot}/build/generated/sources/headers/java/test",
                      "{projectRoot}/build/tmp/compileTestJava/previous-compilation-data.bin",
                    ],
                  },
                  "test-ci--DemoApplicationTest10": {
                    "cache": true,
                    "command": "./gradlew :application:test --tests DemoApplicationTest10",
                    "dependsOn": [
                      "application:classes",
                      "application:compileJava",
                      "library:jar",
                    ],
                    "inputs": [
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest10.java",
                    ],
                    "metadata": {
                      "description": "Runs Gradle test proj/application/src/test/java/com/example/multimodule/application/DemoApplicationTest10.java in CI",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/classes/java/test",
                      "{projectRoot}/build/generated/sources/annotationProcessor/java/test",
                      "{projectRoot}/build/generated/sources/headers/java/test",
                      "{projectRoot}/build/tmp/compileTestJava/previous-compilation-data.bin",
                    ],
                  },
                  "test-ci--DemoApplicationTest2": {
                    "cache": true,
                    "command": "./gradlew :application:test --tests DemoApplicationTest2",
                    "dependsOn": [
                      "application:classes",
                      "application:compileJava",
                      "library:jar",
                    ],
                    "inputs": [
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest2.java",
                    ],
                    "metadata": {
                      "description": "Runs Gradle test proj/application/src/test/java/com/example/multimodule/application/DemoApplicationTest2.java in CI",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/classes/java/test",
                      "{projectRoot}/build/generated/sources/annotationProcessor/java/test",
                      "{projectRoot}/build/generated/sources/headers/java/test",
                      "{projectRoot}/build/tmp/compileTestJava/previous-compilation-data.bin",
                    ],
                  },
                  "test-ci--DemoApplicationTest3": {
                    "cache": true,
                    "command": "./gradlew :application:test --tests DemoApplicationTest3",
                    "dependsOn": [
                      "application:classes",
                      "application:compileJava",
                      "library:jar",
                    ],
                    "inputs": [
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest3.java",
                    ],
                    "metadata": {
                      "description": "Runs Gradle test proj/application/src/test/java/com/example/multimodule/application/DemoApplicationTest3.java in CI",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/classes/java/test",
                      "{projectRoot}/build/generated/sources/annotationProcessor/java/test",
                      "{projectRoot}/build/generated/sources/headers/java/test",
                      "{projectRoot}/build/tmp/compileTestJava/previous-compilation-data.bin",
                    ],
                  },
                  "test-ci--DemoApplicationTest4": {
                    "cache": true,
                    "command": "./gradlew :application:test --tests DemoApplicationTest4",
                    "dependsOn": [
                      "application:classes",
                      "application:compileJava",
                      "library:jar",
                    ],
                    "inputs": [
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest4.java",
                    ],
                    "metadata": {
                      "description": "Runs Gradle test proj/application/src/test/java/com/example/multimodule/application/DemoApplicationTest4.java in CI",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/classes/java/test",
                      "{projectRoot}/build/generated/sources/annotationProcessor/java/test",
                      "{projectRoot}/build/generated/sources/headers/java/test",
                      "{projectRoot}/build/tmp/compileTestJava/previous-compilation-data.bin",
                    ],
                  },
                  "test-ci--DemoApplicationTest5": {
                    "cache": true,
                    "command": "./gradlew :application:test --tests DemoApplicationTest5",
                    "dependsOn": [
                      "application:classes",
                      "application:compileJava",
                      "library:jar",
                    ],
                    "inputs": [
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest5.java",
                    ],
                    "metadata": {
                      "description": "Runs Gradle test proj/application/src/test/java/com/example/multimodule/application/DemoApplicationTest5.java in CI",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/classes/java/test",
                      "{projectRoot}/build/generated/sources/annotationProcessor/java/test",
                      "{projectRoot}/build/generated/sources/headers/java/test",
                      "{projectRoot}/build/tmp/compileTestJava/previous-compilation-data.bin",
                    ],
                  },
                  "test-ci--DemoApplicationTest6": {
                    "cache": true,
                    "command": "./gradlew :application:test --tests DemoApplicationTest6",
                    "dependsOn": [
                      "application:classes",
                      "application:compileJava",
                      "library:jar",
                    ],
                    "inputs": [
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest6.java",
                    ],
                    "metadata": {
                      "description": "Runs Gradle test proj/application/src/test/java/com/example/multimodule/application/DemoApplicationTest6.java in CI",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/classes/java/test",
                      "{projectRoot}/build/generated/sources/annotationProcessor/java/test",
                      "{projectRoot}/build/generated/sources/headers/java/test",
                      "{projectRoot}/build/tmp/compileTestJava/previous-compilation-data.bin",
                    ],
                  },
                  "test-ci--DemoApplicationTest7": {
                    "cache": true,
                    "command": "./gradlew :application:test --tests DemoApplicationTest7",
                    "dependsOn": [
                      "application:classes",
                      "application:compileJava",
                      "library:jar",
                    ],
                    "inputs": [
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest7.java",
                    ],
                    "metadata": {
                      "description": "Runs Gradle test proj/application/src/test/java/com/example/multimodule/application/DemoApplicationTest7.java in CI",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/classes/java/test",
                      "{projectRoot}/build/generated/sources/annotationProcessor/java/test",
                      "{projectRoot}/build/generated/sources/headers/java/test",
                      "{projectRoot}/build/tmp/compileTestJava/previous-compilation-data.bin",
                    ],
                  },
                  "test-ci--DemoApplicationTest8": {
                    "cache": true,
                    "command": "./gradlew :application:test --tests DemoApplicationTest8",
                    "dependsOn": [
                      "application:classes",
                      "application:compileJava",
                      "library:jar",
                    ],
                    "inputs": [
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest8.java",
                    ],
                    "metadata": {
                      "description": "Runs Gradle test proj/application/src/test/java/com/example/multimodule/application/DemoApplicationTest8.java in CI",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/classes/java/test",
                      "{projectRoot}/build/generated/sources/annotationProcessor/java/test",
                      "{projectRoot}/build/generated/sources/headers/java/test",
                      "{projectRoot}/build/tmp/compileTestJava/previous-compilation-data.bin",
                    ],
                  },
                  "test-ci--DemoApplicationTest9": {
                    "cache": true,
                    "command": "./gradlew :application:test --tests DemoApplicationTest9",
                    "dependsOn": [
                      "application:classes",
                      "application:compileJava",
                      "library:jar",
                    ],
                    "inputs": [
                      "{projectRoot}/src/test/java/com/example/multimodule/application/DemoApplicationTest9.java",
                    ],
                    "metadata": {
                      "description": "Runs Gradle test proj/application/src/test/java/com/example/multimodule/application/DemoApplicationTest9.java in CI",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
                    "outputs": [
                      "{projectRoot}/build/classes/java/test",
                      "{projectRoot}/build/generated/sources/annotationProcessor/java/test",
                      "{projectRoot}/build/generated/sources/headers/java/test",
                      "{projectRoot}/build/tmp/compileTestJava/previous-compilation-data.bin",
                    ],
                  },
                  "testClasses": {
                    "cache": true,
                    "command": "./gradlew :application:testClasses",
                    "dependsOn": [
                      "application:processTestResources",
                      "application:compileTestJava",
                    ],
                    "metadata": {
                      "description": "Assembles test classes.",
                      "technologies": [
                        "Gradle",
                      ],
                    },
                    "options": {
                      "cwd": "proj",
                    },
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
