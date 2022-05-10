//获取元素
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    //指定类名。以运用于css
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //console.log(input.value.trim());
    if (re.test(input.value.trim())) {
      showSuccess(input);
      //console.log("true");
    } else {
      showError(input, 'Email is not valid');
      //console.log("false");
    }
}

// Check required fields
function checkRequired(inputArr) {
    let isRequired = true;
    //将数组中每个元素都执行函数
    inputArr.forEach(function(input) {
        //console.log(input.value);
        if (input.value.trim() == '') {
        //无视声明顺序调用函数
            showError(input, `${getFieldName(input)} is required`);
            isRequired = false;
        } else {
            showSuccess(input);
        }
    });
  
    return isRequired;
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
      showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters`
      );
    } else if (input.value.length > max) {
      showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
      );
    } else {
      showSuccess(input);
    }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
    //console.log(input1.value);
    if (input1.value !== input2.value) {
      showError(input2, 'Passwords do not match');
    }
}

// Get fieldname
function getFieldName(input) {
    //slice(1):位置1到end切片
    //首字母大写+其余部分
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e) {
    //若此事件未被显式处理，默认动作不应该被执行
    e.preventDefault();
    //首先检查是否为空
    if(checkRequired([username, email, password, password2])){
      checkLength(username, 1, 15);
      checkLength(password, 1, 25);
      checkEmail(email);
      checkPasswordsMatch(password, password2);
    }
});