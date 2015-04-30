/* jshint -W117, -W030 */
/* jshint multistr:true */
describe('htSidebarCollapse directive: ', function () {
    var el;
    var sidebarCollapseClass = 'sidebarCollapse';
    var scope;
    var body;

    beforeEach(function(){
        module('app.layout',function($provide){
            $provide.decorator('$document',function($delegate){

                body = new FakeBody();

                $delegate.find = function(selector){
                    return body;
                };

                return $delegate;

            });
        });
    });

    beforeEach(inject(function($compile, $rootScope, _$document_) {
        $document = _$document_;
        // The minimum necessary template HTML for this spec.
        // Simulates a menu link that opens and closes a dropdown of menu items
        // The `when-done-animating` attribute is optional (as is the vm's implementation)
        //
        // N.B.: the attribute value is supposed to be an expression that invokes a $scope method
        //       so make sure the expression includes '()', e.g., "vm.sidebarReady(42)"
        //       no harm if the expression fails ... but then scope.sidebarReady will be undefined.
        //       All parameters in the expression are passed to vm.sidebarReady ... if it exists
        //
        // N.B.: We do NOT add this element to the browser DOM (although we could).
        //       spec runs faster if we don't touch the DOM (even the PhantomJS DOM).
        el = angular.element(
            '<a href="#" ht-sidebar-collapse when-done-animating="vm.sidebarReady(42)" > \
             </a>');

        // ng's $compile service resolves nested directives (there are none in this example)
        // and binds the element to the scope (which must be a real ng scope)
        scope = $rootScope;
        $compile(el)(scope);

        // tell angular to look at the scope values right now
        scope.$digest();
    }));

    /// tests ///
    describe('the side-bar-collapse class', function () {
        it('is absent for a visible sidebar', function () {
            hasSidebarCollpaseClass(false);
        });

        it('is added after clicking', function () {
            clickIt();
            hasSidebarCollpaseClass(true);
        });

        it('is removed after clicking again', function () {
            clickIt();
            clickIt();
            hasSidebarCollpaseClass(false);
        });

    });


    /////// helpers //////

    // click the "menu" link
    function clickIt() {
        el.trigger('click');
    }

    // assert whether the "menu" link has the class that means 'is open'
    function hasSidebarCollpaseClass(isTrue) {
        var hasClass = $document.find('body').hasClass(sidebarCollapseClass);
        expect(hasClass).equal(!!isTrue,
            'body has the "sidebar collpase" class is ' + hasClass);
    }



    function FakeBody(){

        var _classes = [];
        this.hasClass = hasClass;
        this.addClass = addClass;
        this.removeClass = removeClass;

        function hasClass(className){
            return -1 !== _classes.indexOf(className);
        }
        function addClass(className){
            _classes.push(className);
        }
        function removeClass(className){
            _classes = _classes.splice(_classes.indexOf(className),1);
        }
    }
});
