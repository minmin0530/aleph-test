var n={driver:{name:"Deno Mongo",version:"v0.0.1"},os:{type:Deno.build.os,name:Deno.build.os,architecture:Deno.build.arch}};async function o(e){return await e.commandSingle("admin",{isMaster:!0,client:n})}export{n as driverMetadata,o as handshake};
