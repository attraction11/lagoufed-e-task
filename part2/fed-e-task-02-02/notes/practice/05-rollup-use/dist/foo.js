define(['require'], function (require) { 'use strict';

    // // 导入模块成员
    // import _ from 'lodash-es'
    // import { log } from './logger'
    // import messages from './messages'
    // import { name, version } from '../package.json'
    // import cjs from './cjs-module'

    // // 使用模块成员
    // const msg = messages.hi

    // log(name)
    // log(version)
    // log(_.camelCase('hello world'))
    // log(cjs)



    new Promise(function (resolve, reject) { require(['./logger-98b2bd18'], resolve, reject) }).then(({ log }) => {
        log('code splitting~');
    });

});
