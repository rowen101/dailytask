@extends('layouts.app')

@section('content')
    <div class="container-fluid">
        <div class="row h-100">
            <div class="login-left-content">
                <div style="background-image: url('https://wallpaperaccess.com/full/2308901.jpg');background-repeat: no-repeat;background-size: auto;"
                    class="col-sm-8 col-2 h-100  text-white py-2 d-flex align-items-center justify-content-center fixed-top"
                    id="left">

                    <h5 class=" d-none d-sm-block">
                        <h1 class="display-3 text-white mb-20">{{ config('app.name', 'Laravel') }}</h1>
                    </h5>
                </div>
            </div>

            <div class="col offset-2 offset-sm-8 py-2 login-right-content">
                <h4 class="text-center display-8 mb-10">{{ config('app.name', 'Laravel') }}</h4>
                <p class="text-center display-5">Sign In.</p>

                <div id="login"></div>


            </div>

        </div>
    </div>

    </div>
    <style>
        main {
            margin-top: 0;
        }

        .main-content {
            margin-left: 0;
            background: #F8FAFC;
        }

    </style>
@endsection
@section('scripts')
    <script src="{{ asset('js/login.js') }}"></script>
@endsection
