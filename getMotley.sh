rm -rf motley_tmp
mkdir -p motley_tmp
cd motley_tmp
wget https://github.com/coding-blocks/motley/archive/master.zip
unzip master.zip
# tar -xzf master.zip
rm -rf ../app/styles/*
cp -rf motley-master/sass/styles/* ../app/styles/
cd ..
rm -rf app/styles/*.css*
rm -rf motley_tmp
