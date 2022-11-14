## Logical Entities of a graph
1. Nodes
   1. Implemented Nodes (Are mapped directly to implementation)
   2. Defined Nodes (Are defined as graph or module in Code 9)
2. Type
3. Methods
4. Fields
5. Inputs
6. Outputs
7. Connections
8. Graph
9. Module
10. Access Limiter (like Public , private) -- Optional
11. Comments ?? --> Should be display only?

### TODO
1. Consider Sync & Async Nature of tasks
2. Need to provide ability for code reviews & diffing to be effective.
3. Interoperability with multiple language will be huge boon.
   1. Try building Code 9 to Java / JavaScript / Rust translator, test with fibonacci & compare perf.

### Validations / Invariants
1. Expressions can't be cyclic, loops / recursion can be.
2. All slots are directional, origin must be an output slot, target must be an input slot.
3. Output slot can connect to multiple Input Slots.
4. Input slot can only receive one connection.

### Concept DSL for textual representation of Flow Based Graphical Language
Grammar Terms & their description
```text
fully_qualified_function_id : Covers all necessary detail to be able to give semantic meaning to node, either as
built in function or as separately created graph
fully_qualified_node_type : Covers all necessary details to be able to resolve to specific node type covering cross 
modules / cross graphs resolution if needed.
graph_id : Gives the current graph unique id within current module
node_id : Gives node unique id within current graph
slot_id : Gives slot unique id within current node
graph : A whole graph description, may or may not have graph_id
field_id : Unique field id within graph
type : Data Type
```
Graph grammar
```text
(<graph_id>)?
(
(<field_id> <type>;) |
(<method_id> (<graph_id>|<graph>);) |
( NODETYPE <node_type>
    ( MAPS <fully_qualified_function_id>)?
    ( IN <slot_id> <type> )*
    ( OUT <slot_id> <type> )*
    ;) |
(NODE <node_id>: <fully_qualified_node_type>;) |
(CONN <node_id>.<slot_id> <node_id>.<slot_id>;)
)*
```

## Display Attributes

### Attributes on entities like Nodes & Slots & Some on path
1. position
2. size
3. colour
4. shape
5. doesOverlap : Point -> bool ?