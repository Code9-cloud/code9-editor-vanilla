export const EXAMPLE_ADD = {
  "name" : "Add Numbers",
  "nodes" : [
    {
      "name" : "Input",
      "type" : "INPUT",
      "id" : "input_1",
      "pos_x" : 100,
      "pos_y" : 100,
      "width" : 60,
      "height" : 60,
      "inputs" : [],
      "outputs" : [
        {
          "id" : "input_1_out",
          "name": "Method Call",
          "is_exec": true
        },
        {
          "id" : "input_1_a",
          "name" : "a",
          "type" : "I64"
        },
        {
          "id" : "input_1_b",
          "name" : "b",
          "type" : "I64"
        }
      ]
    },
    {
      "name" : "Add",
      "type" : "ADD",
      "id" : "add_1",
      "pos_x" : 300,
      "pos_y" : 300,
      "width" : 60,
      "height" : 60,
      "inputs" : [
        {
          "id" : "add_1_a",
          "name" : "a",
          "type" : "I64"
        },
        {
          "id" : "add_1_b",
          "name" : "b",
          "type" : "I64"
        }
      ],
      "outputs" : [
        {
          "id" : "add_1_c",
          "name" : "c",
          "type" : "I64",
          "is_output" : false
        }
      ]
    },
    {
      "name" : "Return",
      "type" : "RETURN",
      "id" : "return_1",
      "pos_x" : 700,
      "pos_y" : 100,
      "width" : 60,
      "height" : 60,
      "inputs" : [
        {
          "id" : "return_1_in",
          "name" : "Return",
          "is_exec" : true
        },
        {
          "id" : "return_1_val",
          "name": "val",
          "type" : "I64"
        }
      ],
      "outputs" : []
    }
  ],
  "paths" : [
    {
      "in_node": "input_1",
      "start" : "input_1_out",
      "out_node": "return_1",
      "end" : "return_1_in"
    },
    {
      "in_node": "input_1",
      "start" : "input_1_a",
      "out_node": "add_1",
      "end" : "add_1_a"
    },
    {
      "in_node": "input_1",
      "start" : "input_1_b",
      "out_node": "add_1",
      "end" : "add_1_b"
    },
    {
      "in_node": "add_1",
      "start" : "add_1_c",
      "out_node": "return_1",
      "end" : "return_1_val"
    }
  ]
};