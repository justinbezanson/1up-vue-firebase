
const Validation = {
    isNotEmpty: function(key, vm) {
        if(typeof key === 'object') {
            if(vm.form[key.data][key.index][key.property].length === 0) {
                vm.errors[key.data][key.index][key.property] = vm.messages[key.data][key.property];
                return false;
            }
        } else if (vm.form[key].length === 0) {
            vm.errors[key] = vm.messages[key];
            return false;
        }

        return true;
    }
};

export default Validation;