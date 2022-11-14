import Orchestrator from "./Orchestrator";

let canvas = document.getElementById('mycanvas');

// var stt = new Editor(canvas);
// document.getElementById('addnode').onclick = function() {
//     stt.addNode(parseInt(document.getElementById('posx').value),
//         parseInt(document.getElementById('posy').value), 40, 40);
// }
// // stt.registerGlobalRedraw(redraw);
// // stt.updateState();
// stt.run();
// stt.addNode();
// stt.addNode(100,300);
// stt.addNode(100,300);
// stt.addNode(200,400,100,100, 1, 1);
// stt.addNode(220,420,100,100, 2, 2);

let orchestrator = new Orchestrator(1, canvas);
orchestrator.begin();
// orchestrator.run();

// function runTest(gh) {
//     let i = 0;
//     let itr = 1000;
//     while(i < itr) {
//         let pos_x = Math.floor(Math.random() * 1920);
//         let pos_y = Math.floor(Math.random() * 1080);
//         let size_x = 60 + Math.floor(Math.random() * 60);
//         let size_y = 60 + Math.floor(Math.random() * 60);
//         let in_nodes = Math.floor(Math.random() * 4);
//         let out_nodes = Math.floor(Math.random() * 4);
//         gh.addNode(pos_x,pos_y,size_x,size_y,in_nodes,out_nodes);
//         i += 1;
//     }
// }

// runTest(stt);