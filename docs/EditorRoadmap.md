1. Make the Nodes & Slots look better
   1. Nodes to have heading and sub heading
   2. Slots need to have types
   3. Types to have unique color / shape
   4. Paths should match the color
   5. Slot should have slot names
   6. Path to be made into curve
   7. Click / Dbl click on path to add reroute node
   8. Highlight path on hover
2. Build Tabs
3. Build Menu Bar
4. Build Side Panel
5. Build Right Click Menu
6. Add Search in Right Click Menu
7. Build Save & Load
8. Implement Drag & Drop from side menu
9. Implement Creating Subgraphs
10. Implement Undo & Redo

# Redo

1. Create a layout based views using PIXI --> Android's Approach of View, ViewGroup & Layouts - 27
   1. Horizontal List Layout (Alignment left / right, elements with left alignment must be first, and right must be at end)
   2. Vertical List Layout (Alignment top / bottom)
   3. Grid Layout ??
   4. Overlay components with transparency ??
   5. Allow size adjustments through borders of components that are adjustable
   6. Allow Scrolling of elements
2. Menubar- 30
   1. Menu Items
   2. Drop down sub menu
   3. Side load sub sub menu
   4. Optional Icons
3. Toolbar - 4
4. Side Navigation (Icons only) - 7
   1. Icons
   2. On Hover Description
   3. On Click navigate side panel / Open or close or switch bottom pop up menus
5. Side Panels - 11
   1. Render Context specific info in panel
   2. Can have sub segments
6. Bottom Status Bar ??
   1. Context Specific, features yet to think, but VCS etc can be put here
7. Bottom Pop up menu ??
   1. Context Specific, depends on navigated item from side nav or bottom bar.
8. Main Panel | Graph Editor - 25
   1. Render Nodes
      1. Render Header if required
      2. Render centered icon if operator
      3. Render Input Slots
      4. Render Output Slots
      5. Slots can have Icon(for their type), Name, Placeholder for default or cost values
      6. When Editing a function, its inputs and outputs should appear in side panel and update to inputs, outputs and their type shall be supported.
   2. Render Paths
   3. Allow creation of paths
   4. Allow creation of flows
   5. Allow Dragging of Nodes
   6. Allow creation of reroute node for better graphs
   7. Allow Zooming in out of graph
   8. Allow Load and Save
9. Allow Undo, Redo - 29