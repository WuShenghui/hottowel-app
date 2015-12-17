/* jshint -W117, -W030 */
describe('department routes', function () {
    describe('state', function () {
        var view = 'app/department/it/it.html';

        beforeEach(function() {
            module('app.department.it', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state it to url /department/it ', function() {
            expect($state.href('department-it', {})).to.equal('/department/it');
        });

        it('should map /department/it route to department/it View template', function () {
            expect($state.get('department-it').templateUrl).to.equal(view);
        });

        it('of department-it should work with $state.go', function () {
            $state.go('department-it');
            $rootScope.$apply();
            expect($state.is('department-it'));
        });
    });
});
