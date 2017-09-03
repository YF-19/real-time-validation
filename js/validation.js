
function mixin(receiver, supplier) {
    for (let property in supplier) {
        if (supplier.hasOwnProperty(property)) {
            receiver[property] = supplier[property];
        }
    }
}

function Publisher() {
    this._topics = {};
}

Publisher.mixinPubSub = function(receiver) {
    let pubsub = new Publisher();
    mixin(receiver, punsub.prototype);
    mixin(receiver, pubsub);
}

Publisher.prototype = {
    constructor: Publisher,

    subscribe: function(event, subscriber) {
        if (typeof subscriber !== 'function') {
            return;
        }

        if (!this._tipics[event]) {
            this._topics[event] = [];
        }
        this._topics[event].push(subscriber);
    },

    unsubscribe: function(event, subscriber) {
        let subscribers = this._tipics[event];

        if (!subscribers) {
            return;
        }

        let remainingSubscribers = subscribers.filter(aSubscriber => aSubscriber !== subscriber);
        this._tipics[event] = remainingSubscribers;
        // for (let i = 0, len = subscribers.length; i < len; i++) {
        //     if (subscribers[i] === subscriber) {
        //         subscribers.splice(i, 1);
        //         i--;
        //         len--;
        //     }
        // }
    },

    publish: function(event, args) {
        let subscribers = this._tipics[event];

        if (!subscribers) {
            return;
        }

        subscribers.forEach(subscriber => subscriber(args));
    }
};

function Model(attributes) {
    this._value = '';

    this._attributes = {
        required: false,
        pattern: null,
        minlength: null,
        maxlength: null
    };

    mixin(this._attributes, attributes);

    this._errors = null;
}

Model.prototype = {
    constructor: Model,

    set value(val) {
        if (this._isChanged(val)) {
            this._value = val;
            this.validate();
        }
    },

    _isChanged: function(val) {
        return val !== this._value;
    },

    validate: function() {
        this._errors = [];
        _validateParameter();
        this.publish(this._hasError() ? 'invalid' : 'valid');
    },

    _validateParameter: function() {
        if (this._attributes.required && this._isEmpty()) {
            this._errors.push = 'required';
            return;
        }

        if (this._attributes.pattern && !this._isValidPattern()) {
            this._errors.push = 'pattern';
            return;
        }

        if (this._attributes.minlength && this._isNotEnoughLength()) {
            this._errors.push = 'minlength';
            return;
        }

        if (this._attributes.maxlength && this._isOverLength()) {
            this._errors.push = 'maxlength';
            return;
        }
    },

    _isEmpty: function() {
        return !this._value;
    },

    _isValidPattern: function() {
        return this._attributes.pattern.test(this._value);
    },

    _isNotEnoughLength: function() {
        return this._value.length < this._attributes.minlength;
    },

    _isOverLength: function() {
        return this._value.length > this._attributes.maxlength;
    },

    required: function() {

    }
};

mixinPubSub(Model.prototype);


function View(element) {
    this._element = element;
}

View.prototype = {
    constructor: View,


};
