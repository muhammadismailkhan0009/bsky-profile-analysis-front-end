# Profile Analysis Code Organization

This feature prefers clear boundaries between orchestration, rendering, and usage.

## Directory Shape

- Flow definitions go in a `flows/` directory inside the relevant feature area.
- Components used by a flow go in a `components/` directory inside that feature area.
- The file that renders `FlowRunner` should stay separate from both the flow definition and component definitions.
- Shared flow types can live in a small `types.ts` next to that feature area's runner, components, and flows.

## Boundary Expectations

- Flow files define state, transitions, action steps, and side-effect sequencing.
- Component files render UI from `input` and emit typed user intent through `output.emit(...)`.
- Runner files compose `FlowRunner` with a flow definition and should avoid defining flow logic or UI components inline.
