/* jshint -W117, -W030 */
describe('hr routes', function () {
    describe('state', function () {
        var view = 'app/department/hr/hr.html';

        beforeEach(function() {
            module('app.department.hr', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state hr to url /department/hr ', function() {
            expect($state.href('department-hr', {})).to.equal('/department/hr');
        });

        it('should map /department/hr route to hr View template', function () {
            expect($state.get('department-hr').templateUrl).to.equal(view);
        });

        it('of hr should work with $state.go', function () {
            $state.go('department-hr');
            $rootScope.$apply();
            expect($state.is('department-hr'));
        });
    });
});
