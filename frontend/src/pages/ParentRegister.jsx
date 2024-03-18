import React, { useState } from 'react';
import axios from 'axios';
import TextInput from '../components/inputs/TextInput';
import InputLabel from '../components/inputs/InputLabel';
import PasswordInput from '../components/inputs/PasswordInput';
import SubmitBtn from '../components/buttons/SubmitBtn';
import RegisterLayout from '../layouts/auth/RegisterLayout';
import LoginNowBtn from '../components/buttons/LoginNowBtn';
import InputError from '../components/inputs/InputError';
import validateInput from '../helpers/validateInput';

const ParentRegister = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));

    // Validate input on change
    const newErrors = validateInput(name, value, formData);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // cek eror sebelum submit
    if (Object.values(errors).every((error) => error === '')) {
      try {
        const filteredData = {
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password
        };

        // Jika tidak ada kesalahan, lakukan pengiriman data
        console.log('Form submitted successfully!');
        console.log(formData);

        // Mengirim data langsung dengan Axios ke endpoint yang diinginkan
        const response = await axios.post('http://34.86.158.248:8080/auth/parent/signup', filteredData);

        // Menangani respons sesuai kebutuhan
        console.log('Response:', response);
      } catch (error) {
        console.error('Error:', error);
        // Menangani kesalahan jika terjadi
      }
    } else {
      alert('Form contains errors. Please fix them.');
      console.log('Form contains errors. Please fix them.');
    }
  };

  return (
    <RegisterLayout>
      {/* right pane content start */}
      <div className="w-[85%] lg:w-[60%] h-[78%] lg:h-full flex flex-col items-center justify-end lg:justify-center">
        {/* greetings and form start */}
        <div className="w-full bg-white">
          <h1 className="text-b-md mb-5">Daftarkan diri Anda</h1>

          <form className="w-full" onSubmit={handleSubmit}>
            {/* form inputs start */}
            <div id="form__inputs" className="space-y-1">
              {/* full name start */}
              <div>
                <InputLabel labelFor="fullname" content="Nama Lengkap" />
                <TextInput
                  type="text"
                  name="fullname"
                  id="fullname"
                  placeholder="Fiorenza Celestyn"
                  required
                  onChange={handleInputChange}
                  value={formData.fullname}
                />
                {errors.fullname && <InputError error={errors.fullname} />}
              </div>
              {/* full name end */}

              {/* email start */}
              <div>
                <InputLabel labelFor="email" content="Email" />
                <TextInput
                  type="email"
                  name="email"
                  id="email"
                  placeholder="fiorenza@xmail.com"
                  required
                  onChange={handleInputChange}
                  value={formData.email}
                />
                {errors.email && <InputError error={errors.email} />}
              </div>
              {/* email end */}

              {/* username start */}
              <div>
                <InputLabel labelFor="username" content="Username" />
                <TextInput
                  type="text"
                  name="username"
                  id="username"
                  placeholder="fiorenza99"
                  required
                  onChange={handleInputChange}
                  value={formData.username}
                />
                {errors.username && <InputError error={errors.username} />}
              </div>
              {/* username end */}

              {/* password start */}
              <div>
                <InputLabel labelFor="password" content="Password" />
                <PasswordInput name="password" id="password" onChange={handleInputChange} value={formData.password} />
                {errors.password && <InputError error={errors.password} />}
              </div>
              {/* password end */}

              {/* confirm password start */}
              <div>
                <InputLabel labelFor="password" content="Konfirmasi password" />
                <PasswordInput
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={handleInputChange}
                  value={formData.confirmPassword}
                />
                {errors.confirmPassword && <InputError error={errors.confirmPassword} />}
              </div>
              {/* confirm password end */}
            </div>

            {/* form inputs start */}

            {/* submit button start */}
            <div className="mt-4 lg:mt-4 mb-2">
              <SubmitBtn text="Daftar" />
            </div>
            {/* submit button
             end */}

            {/* sign up? start */}
            <div>
              <LoginNowBtn link="/masuk/orangtua" />
            </div>
            {/* sign up? end */}
          </form>
        </div>
      </div>
      {/* right pane content end */}
    </RegisterLayout>
  );
};

export default ParentRegister;
