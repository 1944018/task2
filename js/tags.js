(function() {
  var testApp;

  testApp = angular.module('tag-input', []);

  testApp.controller('FormCtrl', function($scope) {
    $scope.listone = "";
    $scope.listtwo = "one,two,three";
    $scope.listthree = "";
    return $scope.users = ["Max", "Tim", "Bernd", "Angela"];
  });

  testApp.directive('tagInput', function() {
    return {
      restrict: 'E',
      scope: {
        inputTags: '=taglist',
        autocomplete: '=autocomplete'
      },
      link: function($scope, element, attrs) {
        $scope.defaultWidth = 200;
        $scope.tagText = '';
        $scope.placeholder = attrs.placeholder;
        $scope.tagArray = function() {
          if ($scope.inputTags === undefined) {
            return [];
          }
          return $scope.inputTags.split(',').filter(function(tag) {
            return tag !== "";
          });
        };
        $scope.addTag = function() {
          var tagArray;
          if ($scope.tagText.length === 0) {
            return;
          }
          tagArray = $scope.tagArray();
          tagArray.push($scope.tagText);
          $scope.inputTags = tagArray.join(',');
          return $scope.tagText = "";
        };
        $scope.deleteTag = function(key) {
          var tagArray;
          tagArray = $scope.tagArray();
          if (tagArray.length > 0 && $scope.tagText.length === 0 && key === undefined) {
            tagArray.pop();
          } else {
            if (key !== undefined) {
              tagArray.splice(key, 1);
            }
          }
          return $scope.inputTags = tagArray.join(',');
        };
        $scope.$watch('tagText', function(newVal, oldVal) {
          var tempEl;
          if (!(newVal === oldVal && newVal === undefined)) {
            tempEl = $("<span>" + newVal + "</span>").appendTo("body");
            $scope.inputWidth = tempEl.width() + 5;
            if ($scope.inputWidth < $scope.defaultWidth) {
              $scope.inputWidth = $scope.defaultWidth;
            }
            return tempEl.remove();
          }
        });
        element.bind("keydown", function(e) {
          var key;
          key = e.which;
          if (key === 9 || key === 13) {
            e.preventDefault();
          }
          if (key === 8) {
            return $scope.$apply('deleteTag()');
          }
        });
        return element.bind("keyup", function(e) {
          var key;
          key = e.which;
          if (key === 32) {
            e.preventDefault();
            return $scope.$apply('addTag()');
          }
        });
      },
      template: "<div class='tag-input-ctn'><div class='input-tag' data-ng-repeat=\"tag in tagArray()\">{{tag}}<div class='delete-tag' data-ng-click='deleteTag($index)'>&times;</div></div></div><br><br><br><input type='text' class='textbox' data-ng-model='tagText' placeholder='{{placeholder}}'/>"
    };
  });

}).call(this);
