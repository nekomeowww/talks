export interface Point {
  x: number
  y: number
}

export interface NodeBox extends Point {
  width: number
  height: number
}

export interface FlowNode extends NodeBox {
  id: string
  click: number
  title: string
  subtitle: string
  icon: string
  iconClass?: string
  tag?: string
  className?: string
}

export interface FlowEdge {
  id: string
  from: string
  to: string
  click: number
  bend?: number
  lift?: number
  fromAnchor?: Point
  toAnchor?: Point
}

export function nodeCenter(node: NodeBox): Point {
  return {
    x: node.x + node.width / 2,
    y: node.y + node.height / 2,
  }
}

export function nodeAnchor(node: NodeBox, anchor?: Point): Point {
  if (!anchor) {
    return nodeCenter(node)
  }

  return {
    x: node.x + node.width * anchor.x,
    y: node.y + node.height * anchor.y,
  }
}

export function cubicPath(from: Point, to: Point, options: { bend?: number, lift?: number } = {}): string {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const bend = options.bend ?? 0.5
  const lift = options.lift ?? 0
  const c1 = {
    x: from.x + dx * bend,
    y: from.y + dy * 0.12 - lift,
  }
  const c2 = {
    x: to.x - dx * bend,
    y: to.y - dy * 0.12 - lift,
  }

  return `M${from.x} ${from.y} C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`
}

export function edgePath(nodes: FlowNode[], edge: FlowEdge): string {
  const from = nodes.find(node => node.id === edge.from)
  const to = nodes.find(node => node.id === edge.to)

  if (!from || !to) {
    return ''
  }

  return cubicPath(
    nodeAnchor(from, edge.fromAnchor),
    nodeAnchor(to, edge.toAnchor),
    {
      bend: edge.bend,
      lift: edge.lift,
    },
  )
}
