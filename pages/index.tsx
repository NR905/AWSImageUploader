import { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from '../src/aws-exports';
import { Amplify, Auth, Storage } from 'aws-amplify';
import ImageUploading from 'react-images-uploading';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import { FileUploader } from '@aws-amplify/ui-react';
import { Image, ScrollView, defaultDarkModeOverride, Button, Flex, Heading, ThemeProvider, ColorMode, Card, ToggleButtonGroup, ToggleButton, Text } from '@aws-amplify/ui-react';
  
Amplify.configure({ ...awsExports });


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [imageKeyList , setImageKeyList] = useState<string[]>([])
  const onUploadSuccess = (event:any) => {
    console.log(event)
    getImageList()
  }

  const getImageList = async () => {
    const files = await Storage.list('', { level: 'private' })
    const keys = files.results.map(f => f.key as string)
    if (keys.length > 0) {
      setImageKeyList(keys)
    } else {
      setImageKeyList([])
    }
  }

  const handleDelete = async (key:string) => {
    await Storage.remove(key, { level: 'private' })
    getImageList()
  }

  useEffect(() => {
    getImageList()
  }, [])

  return (
    <Flex direction='column' height='100vh' backgroundColor={"slate"}>
      <Flex justifyContent={"center"}>
      <Image src={"https://www.niharana.com/assets/aiu.jepg"} className='self-center' alt={"Niharana"} width={400} height={200} />
      <Flex direction='column' justifyContent='center' alignItems='center'>
      <Button
          alignSelf={'center'}
          variation='warning'
          width={100}
          onClick={() => Auth.signOut()}>
          Sign out
        </Button>
      </Flex>

      </Flex>

      <Authenticator>
        <Flex flex={1} justifyContent='space-between'>
          <Flex direction='column' width='40%'>
            <Text
              textAlign='center'
            >Image Uploader</Text>
            <FileUploader
              acceptedFileTypes={['image/*']}
              accessLevel="private"
              onSuccess={onUploadSuccess}
            />
          </Flex>
          <Flex direction='column' width='60%'>
            <Text
              textAlign='center'
            >Image Gallery</Text>
            <ScrollView maxHeight={"70vh"}>
            {
              imageKeyList && imageKeyList.map((key) => (
                <Card key={key}  >
                  <Flex direction={'column'}>
                  <StorageImage key={key} alt={key} imgKey={key} accessLevel="private" />
                  <Button width={100} variation='warning' onClick={() => handleDelete(key)}>Delete</Button>
                  </Flex>
                </Card>
              ))
            }
            </ScrollView>
          </Flex>
        </Flex>
        
      </Authenticator>
    </Flex>
  )
}
