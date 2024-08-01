import { StoreState, useEditorStore } from "@src/store";
import { Tree, TreeDataNode } from "antd";
import { useState } from "react";

function mapSketchObjectTreeToTreeData(
  sketchObjectTreeItem: StoreState["sketchObjectTree"],
) {
  if (!sketchObjectTreeItem) {
    return undefined;
  }

  const childrenArr: TreeDataNode[] = [];
  sketchObjectTreeItem.children.forEach((child) => {
    const childNode = mapSketchObjectTreeToTreeData(child);
    if (childNode) {
      childrenArr.push(childNode);
    }
  });

  const curNode: TreeDataNode = {
    title: `${sketchObjectTreeItem.obj.userData.type}_${sketchObjectTreeItem.obj.id}`,
    key: String(sketchObjectTreeItem.obj.id),
    children: childrenArr,
  };

  return curNode;
}

export function SketchObjectTree() {
  const sketchObjectTree = useEditorStore((state) => state.sketchObjectTree);
  const rootNode = mapSketchObjectTreeToTreeData(sketchObjectTree);
  const selectedKeys = useEditorStore((state) => state.selectedObjects).map(
    (obj) => String(obj.id),
  );

  return (
    <Tree
      treeData={rootNode ? [rootNode] : []}
      showLine
      defaultExpandAll
      selectable
      selectedKeys={selectedKeys}
    />
  );
}
