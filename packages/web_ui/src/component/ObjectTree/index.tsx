import { StoreState, useGlobalStore } from "@src/store";
import { Tree, TreeDataNode } from "antd";

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
    key: sketchObjectTreeItem.obj.id,
    children: childrenArr,
  };

  return curNode;
}



export function SketchObjectTree() {
  const sketchObjectTree = useGlobalStore((state) => state.sketchObjectTree);
  const rootNode = mapSketchObjectTreeToTreeData(sketchObjectTree);

  return <Tree treeData={rootNode ? [rootNode] : []} />;
}
