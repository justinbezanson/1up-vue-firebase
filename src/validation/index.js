const Validation = {
    isNotEmpty: function(key, vm) {
        if (vm.form[key].length === 0) {
            vm.errors[key] = vm.messages[key];
            return false;
        }

        return true;
    }
};

export default Validation;