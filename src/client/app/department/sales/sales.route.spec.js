/* jshint -W117, -W030 */
describe('sales routes', function () {
    describe('state', function () {
        var view = 'app/department/sales/sales.html';

        beforeEach(function() {
            module('app.department.sales', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state department-sales to url /department/sales ', function() {
            expect($state.href('department-sales', {})).to.equal('/department/sales');
        });

        it('should map /department/sales route to department sales View template', function () {
            expect($state.get('department-sales').templateUrl).to.equal(view);
        });

        it('of department sales should work with $state.go', function () {
            $state.go('department-sales');
            $rootScope.$apply();
            expect($state.is('department-sales'));
        });
    });
});
