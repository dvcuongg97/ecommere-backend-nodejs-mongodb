// 'use strict'

// const _ = require('lodash')

// const {Types} = require('mongoose')

// const convertToObjectMongodb = id => Types.ObjectId(id)

// const getInfoData = ({fields = [], object = {}}) => {
//     return _.pick(object, fields)
// }

// const getSelectData = ( select = [] ) => {
//     return Object.fromEntries(select.map(e => [e, 1]))
// }

// const notSelectData = ( select = [] ) => {
//     return Object.fromEntries(select.map(e => [e, 0]))
// }

// const removeUndefinedObject = ojb => {
//     Object.keys(obj).forEach( k => {
//         if(obj[k] === null ){
//             delete obj[k]
//         }
//     })
//     return obj
// }

// const updateNestedObjectParser = obj => {
//         console.log(`::: before parser :::`, obj);
//         const final = {}
//         Object.keys(obj).forEach( k => {
//             if( typeof obj[k] === 'object' && !Array.isArray(obj[k])){
//                 const response = updateNestedObjectParser(ojb[k])
//                 Object.keys(response).forEach( a => {
//                     final[`${k}.${a}`] = res[a]
//                 })
//             } else {
//                 final[k] = obj[k]
//             }
//         })
//         console.log(`::: before parser :::`, final);

//         return final
// }

// module.exports = {
//     getInfoData,
//     getSelectData,
//     notSelectData,
//     removeUndefinedObject,
//     updateNestedObjectParser,
//     convertToObjectMongodb
// }