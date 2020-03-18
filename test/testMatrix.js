var createTree = require("../kdtree");
// import KDTree from "../kdtree";
var tape = require("tape");
var matrix = {
  elements: [
    15,
    0,
    0,
    0,
    0,
    3.3306690738754696e-15,
    -15,
    0,
    0,
    15,
    3.3306690738754696e-15,
    0,
    -4500,
    -2250.0000000000005,
    2999.9999999999995,
    1
  ]
};
var matrix2 = {
  elements: [5, 0, 0, 0, 0, 1.1102230246251565e-15, -5, 0, 0, 5, 1.1102230246251565e-15, 0, 0, 0, 0, 1]
};
var inputVector = [100, 200, 300];

var inputVector2 = [720, 720, 20];

var boxVertices = [
  [141.30511474609375, -1.4420852661132812, 140.5538330078125],
  [1.4420852661132812, -1.4420852661132812, 140.5538330078125],
  [1.4420852661132812, -141.30511474609375, 140.5538330078125],
  [141.30511474609375, -141.30511474609375, 140.5538330078125],
  [141.30511474609375, -141.30511474609375, 0.6907882690429688],
  [1.4420852661132812, -141.30511474609375, 0.6907882690429688],
  [1.4420852661132812, -1.4420852661132812, 0.6907882690429688],
  [141.30511474609375, -1.4420852661132812, 0.6907882690429688]
];

tape("kdtree-applyMatrix4ToVector", function(t) {
  var resultVector = [-3000, 2250.0000000000005, 4.547473508864641e-13];

  var tree = createTree([]);
  var newVec = tree.applyMatrix4ToVector(inputVector, matrix);

  var test = true;
  t.deepEqual(newVec, resultVector);
  t.end();
});

tape("kdtree-nnd3d", function(t) {
  var correctResult = [141.30511474609375, -1.4420852661132812, 140.5538330078125];
  // var correctResultInWorldSpace = [-2380.4232788085938, -141.69250488281295, 3021.631278991699];
  var correctResultInWorldSpace = [706.5255737304688, 702.7691650390625, 7.210426330566563];

  var tree = createTree(boxVertices);
  var test = tree.applyMatrix4ToVector(correctResult, matrix2);
  // var tes = tree.applyMatrix4ToVector({ x: 141.30511474609375, y: -1.4420852661132812, z: 140.5538330078125 }, matrix);
  // var tes = tree.applyMatrix4ToVector([inputVector2[0], 0, 0], matrix);
  var nearestIndex = tree.nnd3d(inputVector2, matrix2);
  var nearest = tree.applyMatrix4ToVector(boxVertices[nearestIndex], matrix2);

  t.deepEqual(nearest, correctResultInWorldSpace);
  // t.deepEqual(nearest, correctResult);
  t.end();
});
