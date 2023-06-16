# Concepts

1. Flow
2. Editor
3. Schema / Entities
4. Log / Trace
5. Version
6. Data Store
7. Events / Trigger
8. User
9. Consumer
10. Environments
11. Deployment
12. Testing
13. Documentation
14. Plugin
15. Usage
16. Billing
17. Template / Scaffolding --> Gen AI
18. SDLC / Task management Integration
19. VCS Integration
20. Migration
21. Modules
22. Services
23. Live Preview
24. Context Search
---
# Actions

## Flow

1. Should be able to write backend logic in flows.
2. Should be able to intuitively change any flow.
3. Flow Should be hierarchical and composable.
4. Flow should be debuggable.
5. Export of flow should be possible to languages golang, nodejs and rust.

**Concept**- Flow
**State**- List of Nodes, List of Connections
**Action**
**Operational Principle**- Given any algo, it should be able to define its flow
**Purpose**- Ability to describe code visually

### Necessary Nodes

1. Assignment
2. Branch
3. Loop 
4. Functions & Calls 
5. Data Nodes 
6. Custom Nodes 
7. Data Types (Primitives / Compositional / Reference)

### State

1. Nodes
   1. Pins
      1. Name
      2. Type
      3. Default Value
      4. Pin ID
   2. Node Name
   3. Node ID
   4. Add (Node Specific)
2. Connections
   1. Start
      1. Node ID
      2. Pin ID
   2. End
       1. Node ID
       2. Pin ID
   3. Type (Inferred)

### Actions

1. New Flow Creation
2. Save Flow
3. Edit Flow
4. Node Creation / Updation on saving
5. Flow Deletion
6. Define Variables
   1. Global
   2. Local
   3. Input
   4. Output
7. Add Node (Allow Recursion)
8. Add / Update Connections
9. Execute Flow
10. Debug Flow

---

## Editor

1. Editor should allow easy iteration on flows
2. Editor should support upto 1000 nodes that are densely connected.
3. Editor should allow drag drops from other panels of whole product.

---
## Schema / Entities

1. User should be able to model the data stored / request & response schemas or intermediate entities in a intuitive way.
2. Schema should support hierarchical and relational linking.
3. Schema should offer serialization and deserialization in flows.

---
## Log / Trace

1. For production deployments there should be option to easily log info during various stages of flow.
2. Distributed tracing should be supported for issue tracking and resolution

---
## Version

1. User should be able to version control their flows/schemas
2. User should be able to compare 2 versions of flows/schemas
3. Flows should have seemless linking with schema versions.
4. Backward compatibility with older versions of flow should be easy.
5. There should be provision to do partial / progressive rollouts with multiple versions of flows and schema.

---
## Data Store

1. Platform should support arbitrary number of Data Stores with their own nuances.
2. Expose Native ops of Data Store in Intuitive way
---

## Events / Triggers

1. All external sources that trigger flow execution should have Trigger Nodes.
2. Triggers should offer intuitive configuration.
---

## User

1. Ability to Register Users
2. Ability to assign roles to Users
3. Restrict user actions to required roles against the User.
---

## Consumer

1. Ability to tag end user attributes in flow.
2. Based on tagging allow Consumer based tracing of flows.
3. Allow seamless linking to user analytics tools.
---

## Environments

1. Customer / Admin Users should be able to set up multiple deployment environments.
2. Environments on Code 9 platform should have unified experience.
---

## Deployments

1. Ability to take versioned flow(s) and launch them in a target environment
2. Track the progress of deployment
---

## Testing

1. Ability to specify test cases for flows
2. Ability to run configured tests during deployment
---

## Documentation

1. Link flow nodes and flows with documentation
---

## Plugin

1. Platform should be extensible to support third party contributions
---

## Usage

1. Platform should be able to track various usages like servers in use, number of trigger executions, execution time, memory, data transfers etc.
---

## Billing

1. Based on usage and business model, platform should be able to compute cost.
---

## Template / Scaffolding --> Gen AI

1. Platform should allow easy scaffolding of code.
---

## SDLC / Task management Integration

1. Platform should allow integration with task management tools like JIRA, ASANA.
---

## VCS Integration

1. Platform should allow integration
---

## Migration

1. Platform should support migration of schema & flows.
---

## Modules

1. Ability to create modules from a group of flows
2. Ability to abstract flows in a module
---

## Services

1. Platform should top level Tasks and Services in a unified view.
---

## Live Preview

1. In Debug states, show payload and other debug info in live preview.
---

## Context Search

1. There should be searches for faster lookups of various components within platform.
---

# Wireframes

1. A unified portal where we see all the flows.
2. Clicking on Flows should be

---
