"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
var Bucket = {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    metadata: {},
    baseUrl: '/b',
    parent: Storage {
      baseUrl: 'https://storage.googleapis.com/storage/v1',
      apiEndpoint: 'https://storage.googleapis.com',
      timeout: undefined,
      globalInterceptors: [],
      interceptors: [],
      packageJson: {
        _from: '@google-cloud/storage@^5.3.0',
        _id: '@google-cloud/storage@5.7.4',
        _inBundle: false,
        _integrity: 'sha512-fynB3kDT+lhx71laML+LtUs/w9Ezcf+SVAsaP0fhAyPQzOc0kp43uYTymYCvF9GffYR7jcy6yqYifeMSU9VEVA==',
        _location: '/@google-cloud/storage',
        _phantomChildren: {},
        _requested: [Object],
        _requiredBy: [Array],
        _resolved: 'https://registry.npmjs.org/@google-cloud/storage/-/storage-5.7.4.tgz',
        _shasum: 'de79c569a2b296e7c85d9141812fbe107a66c1ef',
        _spec: '@google-cloud/storage@^5.3.0',
        _where: 'D:\\xampp3\\htdocs\\git\\toko\\node_modules\\firebase-admin',
        author: [Object],
        bugs: [Object],
        bundleDependencies: false,
        dependencies: [Object],
        deprecated: false,
        description: 'Cloud Storage Client Library for Node.js',
        devDependencies: [Object],
        engines: [Object],
        files: [Array],
        homepage: 'https://github.com/googleapis/nodejs-storage#readme',
        keywords: [Array],
        license: 'Apache-2.0',
        main: './build/src/index.js',
        name: '@google-cloud/storage',
        repository: [Object],
        scripts: [Object],
        types: './build/src/index.d.ts',
        version: '5.7.4'
      },
      projectId: 'blog-1513057469147',
      projectIdRequired: false,
      providedUserAgent: undefined,
      makeAuthenticatedRequest: [Function: makeAuthenticatedRequest] {
        getCredentials: [Function: bound getCredentials],
        authClient: [GoogleAuth]
      },
      authClient: GoogleAuth {
        checkIsGCE: undefined,
        jsonContent: [Object],
        cachedCredential: null,
        _cachedProjectId: 'blog-1513057469147',
        keyFilename: undefined,
        scopes: [Array],
        clientOptions: undefined
      },
      getCredentials: [Function: bound getCredentials],
      acl: {
        OWNER_ROLE: 'OWNER',
        READER_ROLE: 'READER',
        WRITER_ROLE: 'WRITER'
      },
      getBucketsStream: [Function],
      getHmacKeysStream: [Function]
    },
    id: 'blog-1513057469147.appspot.com',
    createMethod: [Function: bound wrapper],
    methods: {
      create: { reqOpts: [Object] },
      delete: { reqOpts: [Object] },
      exists: { reqOpts: [Object] },
      get: { reqOpts: [Object] },
      getMetadata: { reqOpts: [Object] },
      setMetadata: { reqOpts: [Object] }
    },
    interceptors: [],
    pollIntervalMs: undefined,
    name: 'blog-1513057469147.appspot.com',
    storage: Storage {
      baseUrl: 'https://storage.googleapis.com/storage/v1',
      apiEndpoint: 'https://storage.googleapis.com',
      timeout: undefined,
      globalInterceptors: [],
      interceptors: [],
      packageJson: {
        _from: '@google-cloud/storage@^5.3.0',
        _id: '@google-cloud/storage@5.7.4',
        _inBundle: false,
        _integrity: 'sha512-fynB3kDT+lhx71laML+LtUs/w9Ezcf+SVAsaP0fhAyPQzOc0kp43uYTymYCvF9GffYR7jcy6yqYifeMSU9VEVA==',
        _location: '/@google-cloud/storage',
        _phantomChildren: {},
        _requested: [Object],
        _requiredBy: [Array],
        _resolved: 'https://registry.npmjs.org/@google-cloud/storage/-/storage-5.7.4.tgz',
        _shasum: 'de79c569a2b296e7c85d9141812fbe107a66c1ef',
        _spec: '@google-cloud/storage@^5.3.0',
        _where: 'D:\\xampp3\\htdocs\\git\\toko\\node_modules\\firebase-admin',
        author: [Object],
        bugs: [Object],
        bundleDependencies: false,
        dependencies: [Object],
        deprecated: false,
        description: 'Cloud Storage Client Library for Node.js',
        devDependencies: [Object],
        engines: [Object],
        files: [Array],
        homepage: 'https://github.com/googleapis/nodejs-storage#readme',
        keywords: [Array],
        license: 'Apache-2.0',
        main: './build/src/index.js',
        name: '@google-cloud/storage',
        repository: [Object],
        scripts: [Object],
        types: './build/src/index.d.ts',
        version: '5.7.4'
      },
      projectId: 'blog-1513057469147',
      projectIdRequired: false,
      providedUserAgent: undefined,
      makeAuthenticatedRequest: [Function: makeAuthenticatedRequest] {
        getCredentials: [Function: bound getCredentials],
        authClient: [GoogleAuth]
      },
      authClient: GoogleAuth {
        checkIsGCE: undefined,
        jsonContent: [Object],
        cachedCredential: null,
        _cachedProjectId: 'blog-1513057469147',
        keyFilename: undefined,
        scopes: [Array],
        clientOptions: undefined
      },
      getCredentials: [Function: bound getCredentials],
      acl: {
        OWNER_ROLE: 'OWNER',
        READER_ROLE: 'READER',
        WRITER_ROLE: 'WRITER'
      },
      getBucketsStream: [Function],
      getHmacKeysStream: [Function]
    },
    userProject: undefined,
    acl: Acl {
      owners: {
        addAllAuthenticatedUsers: [Function],
        deleteAllAuthenticatedUsers: [Function],
        addAllUsers: [Function],
        deleteAllUsers: [Function],
        addDomain: [Function],
        deleteDomain: [Function],
        addGroup: [Function],
        deleteGroup: [Function],
        addProject: [Function],
        deleteProject: [Function],
        addUser: [Function],
        deleteUser: [Function]
      },
      readers: {
        addAllAuthenticatedUsers: [Function],
        deleteAllAuthenticatedUsers: [Function],
        addAllUsers: [Function],
        deleteAllUsers: [Function],
        addDomain: [Function],
        deleteDomain: [Function],
        addGroup: [Function],
        deleteGroup: [Function],
        addProject: [Function],
        deleteProject: [Function],
        addUser: [Function],
        deleteUser: [Function]
      },
      writers: {
        addAllAuthenticatedUsers: [Function],
        deleteAllAuthenticatedUsers: [Function],
        addAllUsers: [Function],
        deleteAllUsers: [Function],
        addDomain: [Function],
        deleteDomain: [Function],
        addGroup: [Function],
        deleteGroup: [Function],
        addProject: [Function],
        deleteProject: [Function],
        addUser: [Function],
        deleteUser: [Function]
      },
      pathPrefix: '/acl',
      request_: [Function: bound request],
      default: Acl {
        owners: [Object],
        readers: [Object],
        writers: [Object],
        pathPrefix: '/defaultObjectAcl',
        request_: [Function: bound request]
      }
    },
    iam: Iam {
      request_: [Function: bound request],
      resourceId_: 'buckets/[object Promise]'
    },
    getFilesStream: [Function],
    [Symbol(kCapture)]: false
  }
  */ 
